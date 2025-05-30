class GetBestEnrollment {
    success: boolean;
    messages: string[];
    data?: any[] | object;
    constructor(success: boolean, messages: string[], data?: any[] | object) {
        this.success = success;
        this.messages = messages;
        this.data = data;
    }
}

const data = [
    {
        id: 123,
        memberNumbers: [
            {
                number: '12345678901',
                type: 7,
            },
        ],
        endDate: '2020-04-28T15:08:18.978Z',
    },
];

export const gbeV2Data = {
    existingEnrollment: new GetBestEnrollment(true, [], data),
    noResult: new GetBestEnrollment(true, []),
    error: new GetBestEnrollment(true, ['mock error']),
};
