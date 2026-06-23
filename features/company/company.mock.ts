import { Company } from "./company.types";

export const companiesMock: Company[] = [
    {
        id: 1,
        tradeName: "OpenAI",
        legalName: "OpenAI LTDA",
        document: "12345678000101",
        status: "ACTIVE",
    },

    {
        id: 2,
        tradeName: "Google",
        legalName: "Google LTDA",
        document: "22345678000101",
        status: "ACTIVE",
    },

    {
        id: 3,
        tradeName: "Microsoft",
        legalName: "Microsoft LTDA",
        document: "32345678000101",
        status: "INACTIVE",
    },
];