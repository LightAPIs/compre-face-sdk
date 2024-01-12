import axios from 'axios';
import { sliceEndDelimiter } from '@/common/url';

export interface GetFileParams {
  arraybuffer: ArrayBuffer;
  blob: Blob;
}

export interface ExadelHeaders {
  [key: string]: string;
  'Content-Type': 'application/json' | 'multipart/form-data';
}

export interface ExadelFaceHeaders {
  [key: string]: string;
  'x-api-key': string;
}

abstract class CompreFaceBase {
  /**
   * Constructor
   * @param url API URL
   * @param key API key
   */
  constructor(protected url: string, protected key: string) {
    this.url = sliceEndDelimiter(this.url);
  }

  /**
   * Update Config
   * @param url API URL
   * @param key API key
   */
  updateConfig(url: string, key: string) {
    this.url = sliceEndDelimiter(url);
    this.key = key;
  }

  /**
   * Get api key
   * @returns api key
   */
  getApiKey(): string {
    return this.key;
  }

  /**
   * Exadel face request headers generator
   * @param headers Custom request headers
   * @returns Exadel face request headers (contains `"x-api-key"`)
   */
  faceHeadersGenerator(headers?: ExadelHeaders): ExadelFaceHeaders {
    const exadelFaceHeaders: ExadelFaceHeaders = {
      'x-api-key': this.key,
    };
    if (headers) {
      Object.assign<ExadelFaceHeaders, ExadelHeaders>(exadelFaceHeaders, headers);
    }
    return exadelFaceHeaders;
  }

  /**
   * GET request method
   * @param path API path
   * @param headers Custom request headers
   * @returns
   */
  protected async faceGet<ReturnType>(path: string, headers?: ExadelHeaders) {
    try {
      const response = await axios.get<ReturnType>(this.url + path, {
        headers: this.faceHeadersGenerator(headers),
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   * GET File request method
   * @param path API path
   * @param responseType Response type
   * @param headers Custom request headers
   * @returns
   */
  protected async faceGetFile<InputType extends keyof GetFileParams>(
    path: string,
    responseType: InputType,
    headers?: ExadelHeaders
  ): Promise<GetFileParams[InputType] | null> {
    try {
      const response = await axios.get<GetFileParams[InputType]>(this.url + path, {
        headers: this.faceHeadersGenerator(headers),
        responseType: responseType, //! Required
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   * DELETE request method
   * @param path API path
   * @param headers Custom request headers
   * @returns
   */
  protected async faceDelete<ReturnType>(path: string, headers?: ExadelHeaders) {
    try {
      const response = await axios.delete<ReturnType>(this.url + path, {
        headers: this.faceHeadersGenerator(headers),
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   * POST request method
   * @param path API path
   * @param data Data body
   * @param headers Custom request headers
   * @returns
   */
  protected async facePost<ReturnType, ParamType = unknown>(path: string, data: ParamType, headers?: ExadelHeaders) {
    try {
      const response = await axios.post<ReturnType>(this.url + path, data, {
        headers: this.faceHeadersGenerator(headers),
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  /**
   * PUT request method
   * @param path API path
   * @param data Data body
   * @param headers Custom request headers
   * @returns
   */
  protected async facePut<ReturnType, ParamType = unknown>(path: string, data: ParamType, headers?: ExadelHeaders) {
    try {
      const response = await axios.put<ReturnType>(this.url + path, data, {
        headers: this.faceHeadersGenerator(headers),
      });
      return response.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  }
}

export { CompreFaceBase };
