/* eslint-disable @typescript-eslint/no-explicit-any */
import { IPatientSearchRequest, IPatientResponse } from '~/types/serviceTypes';
import { PatientSearchMockData } from '~/static/mock-data/patientSearchMockData';

export class MockService {
    private _waitTime = 5000;

    static async search(reqeust?: IPatientSearchRequest): Promise<any[]> {
        return Promise.resolve(PatientSearchMockData.Results);
    }
}
