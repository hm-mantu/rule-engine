import { Injectable } from '@nestjs/common';
// This data is from database
const operatorSign =  {
    greaterThanInclusive: '>=',
    greaterThan: '>',
    lessThan: '<',
    lessThanInclusive: '<=',
    equal: '==',
    notEqual: '!=',
    exists: "notOp",
    contains: 'notOp',
    in: 'notOp',
    and: '&&',
    or: '||',
    range: 'notOp'
}

@Injectable()
export class RuleGeneratorService {
    execute(query, data:any={}){
        return this.generateQueryString(query, data)
    }
    
    run(textCond: string, data: any = {}) {
        // console.log('textCond - ', textCond)
        return new Function('return '+ textCond).bind(data)()
    }

    generateQueryString(query, someData:any = {}) {
        let condition: any = []
        const conditions = query['conditions']
        for (const key in conditions) {
            const cond = conditions[key]
            const { operator, questions } = cond
            switch(operator) {
                case 'and':
                    const andRes = this.parseANDOps(questions, operator, someData)
                    // console.log('AND Query Result - ', andRes)
                    condition.push(andRes)
                    break;
                case 'or': 
                    const orRes = this.parseOROps(questions, operator, someData)
                    // console.log('OR Query Result - ', orRes)
                    condition.push(orRes)
                    break;
                default: 
                    const oq = this.parseOtherOps(cond, someData)
                    const oqRes = this.run(oq, someData)
                    // console.log('Other textQuery: -', oq)
                    // console.log('Other Query Result - ', oqRes)
                    condition.push(oqRes)
                    break;
            }
        }
        // console.log(condition)
        console.log(condition)
        return condition.some((i)=>i == true)
    }

    parseANDOps(questions: any, op, someData:any={}) {
        let textQuery = '( '
        for (let index = 0; index < questions.length; index++) {
            const question = questions[index];
            const ocqs = this.parseOtherOps(question, someData)
            textQuery += `${ocqs} ${index+1 != questions.length ? operatorSign[op] : ''} `
        }
        const andRes = this.run(textQuery += ')', someData)
        // console.log('AND textQuery: -', textQuery)
        textQuery += ` ${operatorSign[op]}`
        return andRes
    }

    parseOROps(questions: any, op, someData:any = {}) {
        let textQuery = '( '
        for (let index = 0; index < questions.length; index++) {
            const question = questions[index]
            const ocqs = this.parseOtherOps(question, someData)
            textQuery += `${ocqs} ${index+1 != questions.length ? operatorSign[op] : ''} `
        }
        const orRes = this.run(textQuery += ')', someData)
        // console.log('OR textQuery: -', textQuery)
        return orRes
    }

    parseOtherOps(question: any, someData: any= {}) {
        const { path, operator, value } = question
        // let checkValue = `'${someData[path]}'`
        let currValue = `'${value}'`
        let pathString = "this"
        const pathArray = path.split('.')
        if (pathArray.length > 1) {
            for (let index = 0; index < pathArray.length; index++) {
                const element = pathArray[index]
                pathString += `["${element}"]`
            }
        } else {
            pathString += `["${path}"]`
        }
        if ( operator == 'in' ) return `${this.checkIn(value, someData[path])}`
        if ( operator == 'range' ) return `${pathString} > ${value[0]} && ${pathString} < ${value[1]}`
        // parse values
        if ( typeof value == 'boolean' ) currValue = `${value}`
        return `${pathString} ${operatorSign[operator]} ${currValue}`
    }

    /*
    * Check any of value is present in the another array
    */
    checkIn(checkValue: any, currentValue: any) {
        let flag = false
        for (const v of checkValue){
            if (currentValue.indexOf(v) > -1) {
                flag = true
                break;
            }
        }
        return flag
    }
}
