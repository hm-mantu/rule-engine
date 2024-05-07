import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RuleGeneratorModule } from './rule-generator/rule-generator.module';
import { MongoMemoryServer } from 'mongodb-memory-server'
import { RuleGeneratorService } from './rule-generator/rule-generator.service';
import { ProgramCondition, ProgramConditionSchema } from './schemas/program_conditions.schema';
import { SomeData, SomeDataSchema } from './schemas/some_datas.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleEngine, RuleEngineSchema } from './schemas/rule-engine.schema';

describe('AppController', () => {
  let appController: AppController; 
  let mongod: MongoMemoryServer
  let service: AppService;
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create()
  })
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, RuleGeneratorService],
      imports: [
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: mongod.getUri(),
          }),
        }),
        RuleGeneratorModule,
        MongooseModule.forFeature([
          { name: ProgramCondition.name, schema: ProgramConditionSchema },
          { name: SomeData.name, schema: SomeDataSchema },
          { name: RuleEngine.name, schema: RuleEngineSchema }
        ])
      ]
    }).compile();

    appController = app.get<AppController>(AppController);
    service = app.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /*describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBeDefined();
    });
  }); */

  // CheckEligibility
  describe('CheckEligibility', () => {
    it('should return false', async () => {
      expect(service.isEligible({
        "selectSubProgram": {
          "resea": true,
          "wp": true,
          "jvsg": true,
          "msfw": true
        },
        "firstName": "Annabella",
        "middleInitial": "T",
        "lastName": "Carabajal",
        "socialSecurityNumberSsn": "520276068",
        "addressLine1": "2014 Gordon road",
        "addressLine2Optional": "",
        "state": {
          "label": "Wyoming",
          "value": "Wyoming"
        },
        "city": "Cheyenne",
        "zipCode": "82007",
        "isMailingAddress": 1,
        "primaryPhoneType": 4,
        "alternateContact": [],
        "dateOfBirth": "1991-02-27T00:00:00.000Z",
        "gender": 0,
        "citizenship": {
          "value": "",
          "label": ""
        },
        "authorizedToWorkInUs": 1,
        "hispanic": 1,
        "spouseOfVeteran": 0,
        "areYouASpouseOrFamilyCaregiver": 0,
        "reservesCurrentlyActivated": 0,
        "spouseOfVeteran1": 0,
        "militaryorVeteran": 0,
        "employmentStatus": 1,
        "apprenticeshipProgram": 0,
        "unemploymentEligibilityStatus": 4,
        "longTermUnemployed": 1,
        "occupation": {
          "value": "",
          "label": ""
        },
        "unemployedDueToLayoffOrTermination": 0,
        "attendedARapidResponseOrientation": 0,
        "eduInfo": {
          "workedAsFarmworker": 0
        },
        "highestSchoolGradeCompleted": 12,
        "highSchoolDiplomaOrEquivalentReceived": 1,
        "highestEducationalLevelCompleted": 25,
        "statesCompulsoryAge": "16",
        "schoolStatus": 3,
        "receivingServicesFromAdultEducationWioaTitleIi": 0,
        "youthBuild": 0,
        "receivingServicesFromJobCorps": 0,
        "VocationalEducation": 0,
        "temporaryAssistance": 0,
        "supplementalSecurityIncomeSsiRecipient": 0,
        "generalAssistance": "no",
        "supplementalNutrition": 0,
        "refugeeCashAssistance": 0,
        "socialSecurityDisabilityInsuranceSsdiRecipient": 0,
        "highPovertyArea": 0,
        "fosterCarePayments": "no",
        "youthCurrentlyReceivesOrIsEligibleToReceiveFreeOrReducedLunchUnderTheRichardBRussellNationalSchoolLunchAct": 0,
        "receivingServicesUnderSnapEmploymentAndTrainingProgram": 0,
        "ticketToWorkHolderIssuedBySocialSecurityAdministration": 0,
        "theTicketToWorkHasBeenAssignedAnEmploymentNetwork": 0,
        "englishLanguageLearner": 0,
        "basicSkillsDeficient": 0,
        "homeless": 0,
        "runaway": 0,
        "fosterCareStatus": "yesCurrentlyIn",
        "exOffender": 0,
        "singleParentIncludingSinglePregnantWomen": 0,
        "displacedHomemaker": 0,
        "culturalBarriers": 0,
        "specialProjectIndicator1": "",
        "specialProjectIndicator2": "",
        "specialProjectIndicator3": "",
        "specialProjectIndicator4": "",
        "specialProjectIndicator5": "",
        "meetsSignificantBarriersToEmploymentSbe": 0,
        "verifiedWith": {},
        "approvedSubPrograms": {
          "wp": true,
          "resea": false,
          "jvsg": false,
          "msfw": false
        },
        "primaryPhoneNumber": "3077575735",
        "registeredWithTheSelectiveService": 4,
        "selectiveServiceRegistrationNumber": "",
        "alienRegistrationNumber": "",
        "mostRecentActiveDutyBeginDate": "",
        "mostRecentActiveDutyEndDate": "",
        "secondActiveDutyBeginDate": "",
        "secondActiveDutyEndDate": "",
        "thirdActiveDutyBeginDate": "",
        "thirdActiveDutyEndDate": "",
        "disabledVeteran": "",
        "veteransVocRehab": 0,
        "homelessVeteran": "",
        "reintegrationProgram": "",
        "homelessVeteransReintegrationProgramGrantee": "",
        "veteranStatus": 0,
        "recentlySeparatedVeteran": "",
        "separatedFromTheUSMilitary": "",
        "theDepartmentOfVeteranAffairs": "",
        "howWereYouReferred": "",
        "transitionAssistanceProgram": 0,
        "dischargefromthemilitary": 0,
        "serviceMemberType": "",
        "projectedDischargeDate": "",
        "areYouBeingInvoluntarilySeparatedFromActiveDutyDueToAReductionInForce": "",
        "typeOfApprenticeship": "",
        "exemptedfromworksearch": 0,
        "dateClaimantWasExemptedFromWorkSearch": "",
        "numberofWeeksunemployed": 11,
        "verifiedWith1": {},
        "age": 32,
        "haitianHeritage": 0,
        "disabilityWorkSetting": "",
        "hcbsWaiver": "",
        "receivedDisabilityFinancialCapability": "",
        "receivedServicesFromVocationalRehabilitation": 0,
        "stateDevelopmentalDisabilityAgency": "",
        "statelocalMentalHealthAgency": "",
        "typeOfCustomizedEmpServicesReceived": ""
      }, {
        "conditions": [
          {
            "operator": "and",
            "questions": [
              {
                "operator": "equal",
                "path": "englishLanguageLearner",
                "value": "1"
              },
              {
                "operator": "equal",
                "path": "homeless",
                "value": "1"
              },
              {
                "operator": "equal",
                "path": "runaway",
                "value": "0"
              }
            ]
          }
        ]
      })).toBe(false)
    })


    it('should return true', async () => {
      expect(service.isEligible({
        "selectSubProgram": {
          "resea": true,
          "wp": true,
          "jvsg": true,
          "msfw": true
        },
        "firstName": "Annabella",
        "middleInitial": "T",
        "lastName": "Carabajal",
        "socialSecurityNumberSsn": "520276068",
        "addressLine1": "2014 Gordon road",
        "addressLine2Optional": "",
        "state": {
          "label": "Wyoming",
          "value": "Wyoming"
        },
        "city": "Cheyenne",
        "zipCode": "82007",
        "isMailingAddress": 1,
        "primaryPhoneType": 4,
        "alternateContact": [],
        "dateOfBirth": "1991-02-27T00:00:00.000Z",
        "gender": 0,
        "citizenship": {
          "value": "",
          "label": ""
        },
        "authorizedToWorkInUs": 1,
        "hispanic": 1,
        "spouseOfVeteran": 0,
        "areYouASpouseOrFamilyCaregiver": 0,
        "reservesCurrentlyActivated": 0,
        "spouseOfVeteran1": 0,
        "militaryorVeteran": 0,
        "employmentStatus": 1,
        "apprenticeshipProgram": 0,
        "unemploymentEligibilityStatus": 4,
        "longTermUnemployed": 1,
        "occupation": {
          "value": "",
          "label": ""
        },
        "unemployedDueToLayoffOrTermination": 0,
        "attendedARapidResponseOrientation": 0,
        "eduInfo": {
          "workedAsFarmworker": 0
        },
        "highestSchoolGradeCompleted": 12,
        "highSchoolDiplomaOrEquivalentReceived": 1,
        "highestEducationalLevelCompleted": 25,
        "statesCompulsoryAge": "16",
        "schoolStatus": 3,
        "receivingServicesFromAdultEducationWioaTitleIi": 0,
        "youthBuild": 0,
        "receivingServicesFromJobCorps": 0,
        "VocationalEducation": 0,
        "temporaryAssistance": 0,
        "supplementalSecurityIncomeSsiRecipient": 0,
        "generalAssistance": "no",
        "supplementalNutrition": 0,
        "refugeeCashAssistance": 0,
        "socialSecurityDisabilityInsuranceSsdiRecipient": 0,
        "highPovertyArea": 0,
        "fosterCarePayments": "no",
        "youthCurrentlyReceivesOrIsEligibleToReceiveFreeOrReducedLunchUnderTheRichardBRussellNationalSchoolLunchAct": 0,
        "receivingServicesUnderSnapEmploymentAndTrainingProgram": 0,
        "ticketToWorkHolderIssuedBySocialSecurityAdministration": 0,
        "theTicketToWorkHasBeenAssignedAnEmploymentNetwork": 0,
        "englishLanguageLearner": 1,
        "basicSkillsDeficient": 0,
        "homeless": 0,
        "runaway": 0,
        "fosterCareStatus": "yesCurrentlyIn",
        "exOffender": 0,
        "singleParentIncludingSinglePregnantWomen": 0,
        "displacedHomemaker": 0,
        "culturalBarriers": 0,
        "specialProjectIndicator1": "",
        "specialProjectIndicator2": "",
        "specialProjectIndicator3": "",
        "specialProjectIndicator4": "",
        "specialProjectIndicator5": "",
        "meetsSignificantBarriersToEmploymentSbe": 0,
        "verifiedWith": {},
        "approvedSubPrograms": {
          "wp": true,
          "resea": false,
          "jvsg": false,
          "msfw": false
        },
        "primaryPhoneNumber": "3077575735",
        "registeredWithTheSelectiveService": 4,
        "selectiveServiceRegistrationNumber": "",
        "alienRegistrationNumber": "",
        "mostRecentActiveDutyBeginDate": "",
        "mostRecentActiveDutyEndDate": "",
        "secondActiveDutyBeginDate": "",
        "secondActiveDutyEndDate": "",
        "thirdActiveDutyBeginDate": "",
        "thirdActiveDutyEndDate": "",
        "disabledVeteran": "",
        "veteransVocRehab": 0,
        "homelessVeteran": "",
        "reintegrationProgram": "",
        "homelessVeteransReintegrationProgramGrantee": "",
        "veteranStatus": 0,
        "recentlySeparatedVeteran": "",
        "separatedFromTheUSMilitary": "",
        "theDepartmentOfVeteranAffairs": "",
        "howWereYouReferred": "",
        "transitionAssistanceProgram": 0,
        "dischargefromthemilitary": 0,
        "serviceMemberType": "",
        "projectedDischargeDate": "",
        "areYouBeingInvoluntarilySeparatedFromActiveDutyDueToAReductionInForce": "",
        "typeOfApprenticeship": "",
        "exemptedfromworksearch": 0,
        "dateClaimantWasExemptedFromWorkSearch": "",
        "numberofWeeksunemployed": 11,
        "verifiedWith1": {},
        "age": 32,
        "haitianHeritage": 0,
        "disabilityWorkSetting": "",
        "hcbsWaiver": "",
        "receivedDisabilityFinancialCapability": "",
        "receivedServicesFromVocationalRehabilitation": 0,
        "stateDevelopmentalDisabilityAgency": "",
        "statelocalMentalHealthAgency": "",
        "typeOfCustomizedEmpServicesReceived": ""
      }, {
        "conditions": [
          {
            "operator": "equal",
            "path": "englishLanguageLearner",
            "value": "1"
          },
          {
            "operator": "equal",
            "path": "homeless",
            "value": "1"
          },
          {
            "operator": "equal",
            "path": "runaway",
            "value": "0"
          }
        ]
      })).toBe(true)
    })
  })
});
