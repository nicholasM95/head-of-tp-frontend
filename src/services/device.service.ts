import { Configuration } from "../lib/device";
import { DeviceApi, type DeviceResponse } from "../lib/device";


const apiConfig = new Configuration({
    basePath: "https://api.headoftp.com",
});

const deviceApi = new DeviceApi(apiConfig);

export const getAllDevices = async (): Promise<DeviceResponse[]> => {
    return await deviceApi.findAllDevices();
};

