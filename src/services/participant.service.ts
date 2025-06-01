import {
    Configuration,
    type CreateParticipantRequest,
    ParticipantApi,
    type ParticipantResponse,
    type PatchParticipantRequest
} from "../lib/participant";

const apiConfig = new Configuration({
    basePath: "https://api.headoftp.com",
});

const participantApi = new ParticipantApi(apiConfig);

export const getAllParticipants = async (): Promise<ParticipantResponse[]> => {
    return await participantApi.findAllParticipants();
};

export const patchParticipantById = async (
    id: string,
    patchParticipantRequest: PatchParticipantRequest
): Promise<void> => {
    return await participantApi.patchParticipantById({
        id,
        patchParticipantRequest
    });
};

export const createParticipant = async (
    createParticipantRequest: CreateParticipantRequest
): Promise<void> => {
    return await participantApi.createParticipant({
        createParticipantRequest
    });
};
