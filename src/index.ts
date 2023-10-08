import { CompreFaceBase } from '@/base/index';
import type { GetFileParams, ExadelHeaders, ExadelFaceHeaders } from '@/base/index';

export { ExadelHeaders, ExadelFaceHeaders };

export type FileType = File | Blob | string;

export interface SubjectResponse {
  /** is the name of the subject */
  subject: string;
}

export type SubjectParamBody = SubjectResponse;

export interface RenameResponse {
  /** failed or success */
  updated: boolean;
}

export interface DeletedResponse {
  /** number of deleted */
  deleted: number;
}

export interface SubjectsResponse {
  /** the list of subjects in Face Collection */
  subjects: string[];
}

export type AddAnExampleOptions =
  | {
      /** Image or Base64 value. Base64 support since 0.5.1 version. allowed image formats: jpeg, jpg, ico, png, bmp, gif, tif, tiff, webp. Max size is 5Mb */
      file: File | string;
      /** This is required when the file type is `Blob` */
      filename?: string;
      /** minimum required confidence that a recognized face is actually a face. Value is between `0.0` and `1.0` */
      detProbThreshold?: string | number;
    }
  | {
      /** Image or Base64 value. Base64 support since 0.5.1 version. allowed image formats: jpeg, jpg, ico, png, bmp, gif, tif, tiff, webp. Max size is 5Mb */
      file: Blob;
      /** This is required when the file type is `Blob` */
      filename: string;
      /** minimum required confidence that a recognized face is actually a face. Value is between `0.0` and `1.0` */
      detProbThreshold?: string | number;
    };

export interface ExampleResponse {
  /** UUID of uploaded image */
  image_id: string;
  /** Subject of the saved image */
  subject: string;
}

export interface ListOfAllExamplesOptions {
  /** what subject examples endpoint should return. If empty, return examples for all subjects. Since 1.0 version */
  subject?: string | number;
  /** page number of examples to return. Can be used for pagination. Default value is `0`. Since 0.6 version */
  page?: number;
  /** faces on page (page size). Can be used for pagination. Default value is `20`. Since 0.6 version */
  size?: number;
}

export interface ListOfAllExamplesResponse {
  /** person faces */
  faces: ExampleResponse[];
  /** page number */
  page_number: number;
  /** requested page size */
  page_size: number;
  /** total pages */
  total_pages: number;
  /** total faces */
  total_elements: number;
}

/**
 * Face plugins
 * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Face-services-and-plugins.md#face-plugins
 */
type FacePluginType = 'age' | 'gender' | 'landmarks' | 'calculator' | 'pose' | 'mask' | 'landmarks2d106';

export type FacesOptions =
  | {
      /** Image or Base64 value. Base64 support since 0.5.1 version. allowed image formats: jpeg, jpg, ico, png, bmp, gif, tif, tiff, webp. Max size is 5Mb */
      file: File | string;
      /** This is required when the file type is `Blob` */
      filename?: string;
      /** maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of `0` represents no limit. Default value: `0` */
      limit?: number;
      /** minimum required confidence that a recognized face is actually a face. Value is between `0.0` and `1.0` */
      detProbThreshold?: string | number;
      /** face plugins. If empty, no additional information is returned */
      facePlugins?: FacePluginType[];
      /** if `true` includes system information like execution_time and plugin_version fields. Default value is `false` */
      status?: boolean;
    }
  | {
      /** Image or Base64 value. Base64 support since 0.5.1 version. allowed image formats: jpeg, jpg, ico, png, bmp, gif, tif, tiff, webp. Max size is 5Mb */
      file: Blob;
      /** This is required when the file type is `Blob` */
      filename: string;
      /** maximum number of faces on the image to be recognized. It recognizes the biggest faces first. Value of `0` represents no limit. Default value: `0` */
      limit?: number;
      /** minimum required confidence that a recognized face is actually a face. Value is between `0.0` and `1.0` */
      detProbThreshold?: string | number;
      /** face plugins. If empty, no additional information is returned */
      facePlugins?: FacePluginType[];
      /** if `true` includes system information like execution_time and plugin_version fields. Default value is `false` */
      status?: boolean;
    };

export interface EmbeddingOptions {
  /** an input embeddings. The length depends on the model (e.g. 512 or 128) */
  embeddings: number[][];
}

export interface AgePluginResponse {
  probability: number;
  high: number;
  low: number;
}

export interface GenderPluginResponse {
  probabiliry: number;
  value: 'male' | 'female';
}

export interface PosePluginResponse {
  pitch: number;
  roll: number;
  yaw: number;
}

export interface MaskPluginResponse {
  probability: number;
  value: 'without_mask' | 'mask_worn_incorrectly' | 'mask_worn_correctly';
}

export type CalculatorPluginResponse = number[];

export type LandmarksPluginResponse = [number, number][];

export interface BoundingBoxResponse {
  probability: number;
  x_max: number;
  y_max: number;
  x_min: number;
  y_min: number;
}

export interface PluginsExecutionTimeResponse {
  age: number;
  gender: number;
  pose: number;
  detector: number;
  calculator: number;
  mask: number;
}

export interface PluginsVersionsResponse {
  age: string;
  gender: string;
  pose: string;
  detector: string;
  calculator: string;
  mask: string;
}

export interface FacesResultResponse {
  /** detected age range. Return only if age plugin is enabled */
  age: AgePluginResponse;
  /** detected gender. Return only if gender plugin is enabled */
  gender: GenderPluginResponse;
  /** detected head pose. Return only if pose plugin is enabled */
  pose: PosePluginResponse;
  /** face embeddings. Return only if calculator plugin is enabled */
  embedding: CalculatorPluginResponse;
  /** list of parameters of the bounding box for this face */
  box: BoundingBoxResponse;
  /** detected mask. Return only if face mask plugin is enabled */
  mask: MaskPluginResponse;
  /** list of the coordinates of the frame containing the face-landmarks. Return only if landmarks plugin is enabled */
  landmarks: LandmarksPluginResponse;
  /** execution time of all plugins */
  execution_time: PluginsExecutionTimeResponse;
}

export interface FacesByEmbeddingResultResponse {
  /** an input embedding */
  embedding: number[];
}

export type RecognizeFacesOptions = FacesOptions & {
  /** maximum number of subject predictions per face. It returns the most similar subjects. Default value: `1` */
  predictionCount?: number;
  /** if `false`, CompreFace won't run a face detector. Instead, it will treat the image as a cropped face. Default value is `true`. Since 1.2 version */
  detectFaces?: boolean;
};

export interface RecognizeFacesByEmbeddingOptions extends EmbeddingOptions {
  /** the maximum number of subject predictions per embedding. It returns the most similar subjects. Default value: `1` */
  predictionCount?: number;
}

export interface RecognizeFacesResultResponse extends FacesResultResponse {
  /** list of similar subjects with size of <`predictionCount`> order by similarity */
  subjects: {
    /** similarity that on that image predicted person */
    similarity: number;
    /** name of the subject in Face Collection */
    subject: string;
  }[];
}

export interface RecognizeFacesResponse {
  result: RecognizeFacesResultResponse[];
  /** contains information about plugin versions */
  plugins_versions: PluginsVersionsResponse;
}

export interface RecognizeFacesByEmbeddingResultResponse extends FacesByEmbeddingResultResponse {
  /** an array that contains results of similarity between the embedding and the input embedding */
  similarities: {
    /** a subject in which the similar embedding was found */
    subject: string;
    /** a similarity between the embedding and the input embedding */
    similarity: number;
  }[];
}

export interface RecognizeFacesByEmbeddingResponse {
  /** an array that contains all the results */
  result: RecognizeFacesByEmbeddingResultResponse[];
}

export type VerifyFacesOptions = FacesOptions & {
  /** UUID of the verifying face */
  imageId: string;
};

export interface VerifyFacesByEmbeddingOptions extends EmbeddingOptions {
  /** an id of the source embedding within the Face Collection */
  imageId: string;
}

export interface VerifyFacesResultResponse extends FacesResultResponse {
  /** similarity that on that image predicted person */
  similarity: number;
}

export interface VerifyFacesResponse {
  result: VerifyFacesResultResponse[];
  /** contains information about plugin versions */
  plugins_versions: PluginsVersionsResponse;
}

export interface VerifyFacesByEmbeddingResultResponse extends FacesByEmbeddingResultResponse {
  /** a similarity between the source embedding and embedding from Face Collection */
  similarity: number;
}

export interface VerifyFacesByEmbeddingResponse {
  /** an array that contains all the results */
  result: VerifyFacesByEmbeddingResultResponse[];
}

export type FaceDetectionOptions = FacesOptions;

export interface FaceDetectionResponse {
  result: FacesResultResponse[];
  /** contains information about plugin versions */
  plugins_versions: PluginsVersionsResponse;
}

export type FaceVerificationOptions = (
  | {
      /** file to be verified. Image or Base64 value. Base64 support since 0.5.1 version. Allowed image formats: jpeg, jpg, ico, png, bmp, gif, tif, tiff, webp. Max size is 5Mb */
      sourceImage: File;
      /** This is required when the sourceImage type is `Blob` */
      sourceImageName?: string;
      /** reference file to check the source file. Image or Base64 value. Base64 support since 0.5.1 version. Allowed image formats: jpeg, jpg, ico, png, bmp, gif, tif, tiff, webp. Max size is 5Mb */
      targetImage: File;
      /** This is required when the targetImage type is `Blob` */
      targetImageName?: string;
    }
  | {
      /** file to be verified. Image or Base64 value. Base64 support since 0.5.1 version. Allowed image formats: jpeg, jpg, ico, png, bmp, gif, tif, tiff, webp. Max size is 5Mb */
      sourceImage: string;
      /** This is required when the sourceImage type is `Blob` */
      sourceImageName?: string;
      /** reference file to check the source file. Image or Base64 value. Base64 support since 0.5.1 version. Allowed image formats: jpeg, jpg, ico, png, bmp, gif, tif, tiff, webp. Max size is 5Mb */
      targetImage: string;
      /** This is required when the targetImage type is `Blob` */
      targetImageName?: string;
    }
  | {
      /** file to be verified. Image or Base64 value. Base64 support since 0.5.1 version. Allowed image formats: jpeg, jpg, ico, png, bmp, gif, tif, tiff, webp. Max size is 5Mb */
      sourceImage: Blob;
      /** This is required when the sourceImage type is `Blob` */
      sourceImageName: string;
      /** reference file to check the source file. Image or Base64 value. Base64 support since 0.5.1 version. Allowed image formats: jpeg, jpg, ico, png, bmp, gif, tif, tiff, webp. Max size is 5Mb */
      targetImage: Blob;
      /** This is required when the targetImage type is `Blob` */
      targetImageName: string;
    }
) &
  Omit<FacesOptions, 'file' | 'filename'> & {
    /** maximum number of subject predictions per face. It returns the most similar subjects. Default value: `1` */
    predictionCount?: number;
  };

export interface FaceVerificationByEmbeddingOptions {
  /** an input embeddings. The length depends on the model (e.g. 512 or 128) */
  source: number[];
  /** an array of the target embeddings. The length depends on the model (e.g. 512 or 128) */
  targets: number[][];
}

export interface FaceVerificationResponse {
  result: {
    /** additional info about source image face */
    source_image_face: FacesResultResponse;
    /** result of face verification */
    face_matches: VerifyFacesResultResponse[];
  }[];
  /** contains information about plugin versions */
  plugins_versions: PluginsVersionsResponse;
}

export interface FaceVerificationByEmbeddingResponse {
  /** an array that contains all the results */
  result: VerifyFacesByEmbeddingResultResponse[];
}

export class FaceRecognitionService extends CompreFaceBase {
  /**
   * Constructor
   * @param url API URL
   * @param key API key
   */
  constructor(url: string = '', key: string = '') {
    super(url, key);
  }

  /**
   * Add a Subject
   * @description Create a new subject in Face Collection. Creating a subject is an optional step, you can upload an example without an existing subject, and a subject will be created automatically.
   * @since 0.6 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#add-a-subject
   * @param subject is the name of the subject
   * @returns
   */
  addASubject(subject: string | number) {
    return this.facePost<SubjectResponse, SubjectParamBody>(
      '/api/v1/recognition/subjects',
      {
        subject: subject.toString(),
      },
      {
        'Content-Type': 'application/json',
      }
    );
  }

  /**
   * Rename a Subject
   * @description Rename existing subject. If a new subject name already exists, subjects are merged - all faces from the old subject name are reassigned to the subject with the new name, old subject removed.
   * @since 0.6 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#rename-a-subject
   * @param oldSubject is the old name of the subject
   * @param newSubject is the new name of the subject
   * @returns
   */
  renameASubject(oldSubject: string | number, newSubject: string | number) {
    return this.facePut<RenameResponse, SubjectParamBody>(
      `/api/v1/recognition/subjects/${oldSubject}`,
      {
        subject: newSubject.toString(),
      },
      {
        'Content-Type': 'application/json',
      }
    );
  }

  /**
   * Delete a Subject
   * @description Delete existing subject and all saved faces.
   * @since 0.6 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#delete-a-subject
   * @param subject is the name of the subject
   * @returns
   */
  async deleteASubject(subject: string | number) {
    //! subject cannot be empty
    const sub = subject.toString().trim();
    if (sub.length > 0) {
      return this.faceDelete<SubjectResponse>(`/api/v1/recognition/subjects/${sub}`, {
        'Content-Type': 'application/json',
      });
    }

    return null;
  }

  /**
   * Delete All Subjects
   * @description Delete all existing subjects and all saved faces.
   * @since 0.6 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#delete-all-subjects
   * @returns
   */
  deleteAllSubjects() {
    return this.faceDelete<DeletedResponse>('/api/v1/recognition/subjects', {
      'Content-Type': 'application/json',
    });
  }

  /**
   * List Subjects
   * @description This returns all subject related to Face Collection.
   * @since 0.6 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#list-subjects
   * @returns
   */
  listSubjects() {
    return this.faceGet<SubjectsResponse>('/api/v1/recognition/subjects/', {
      'Content-Type': 'application/json',
    });
  }

  /**
   * Get the path of "Add an Example of a Subject"
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#add-an-example-of-a-subject
   * @param subject is the name you assign to the image you save
   * @param options options
   * @returns path
   */
  private joinPathOfAddAnExample(subject: string | number, options: Omit<AddAnExampleOptions, 'file' | 'filename'>): string {
    const { detProbThreshold } = options;
    let path = `/api/v1/recognition/faces?subject=${subject}`;
    if (detProbThreshold != undefined) {
      path += `&det_prob_threshold=${detProbThreshold}`;
    }

    return path;
  }

  /**
   * Get the full URL of "Add an Example of a Subject"
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#add-an-example-of-a-subject
   * @param subject is the name you assign to the image you save
   * @param options options
   * @returns full URL
   */
  getURLOfAddAnExample(subject: string | number, options: Omit<AddAnExampleOptions, 'file' | 'filename'>): string {
    return this.url + this.joinPathOfAddAnExample(subject, options);
  }

  /**
   * Add an Example of a Subject
   * @description This creates an example of the subject by saving images. You can add as many images as you want to train the system. Image should contain only one face.
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#add-an-example-of-a-subject
   * @param subject is the name you assign to the image you save
   * @param options options
   * @returns
   */
  addAnExample(subject: string | number, options: AddAnExampleOptions) {
    const path = this.joinPathOfAddAnExample(subject, options);
    const { file, filename } = options;

    if (typeof file === 'string') {
      return this.facePost<ExampleResponse, { file: string }>(
        path,
        { file },
        {
          'Content-Type': 'application/json',
        }
      );
    } else {
      const formData = new FormData();
      formData.append('file', file, filename);

      return this.facePost<ExampleResponse, FormData>(path, formData, {
        'Content-Type': 'multipart/form-data',
      });
    }
  }

  /**
   * List of All Saved Examples of the Subject
   * @description To retrieve a list of subjects saved in a Face Collection.
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#list-of-all-saved-examples-of-the-subject
   * @param options options
   * @returns
   */
  listOfAllExamples(options: ListOfAllExamplesOptions = {}) {
    const { subject, page = 0, size = 20 } = options;
    let path = `/api/v1/recognition/faces?page=${page}&size=${size}`;
    if (subject != undefined) {
      path += `&subject=${subject}`;
    }

    return this.faceGet<ListOfAllExamplesResponse>(path);
  }

  /**
   * Delete All Examples of the Subject by Name
   * @description To delete all image examples of the subject.
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#delete-all-examples-of-the-subject-by-name
   * @param subject is the name subject
   * @returns
   */
  async deleteAllExamplesOfTheSubject(subject: string | number) {
    //! subject cannot be empty
    const sub = subject.toString().trim();
    if (sub.length > 0) {
      return this.faceDelete<DeletedResponse>(`/api/v1/recognition/faces?subject=${sub}`);
    }

    return null;
  }

  /**
   * Delete All Examples
   * @description all faces in Face Collection will be removed.
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#delete-all-examples-of-the-subject-by-name
   * @returns
   */
  // deleteAllExamples() {
  //   return this.faceDelete<DeletedResponse>('/api/v1/recognition/faces');
  // }
  //! In version 1.2.0, the test response is { message: 'Subject name is empty; ', code: 26 }

  /**
   * Delete an Example of the Subject by ID
   * @description Endpoint to delete an image by ID.
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#delete-an-example-of-the-subject-by-id
   * @param imageId UUID of the removing face
   * @returns
   */
  async deleteAnExample(imageId: string) {
    const id = imageId.trim();
    if (id.length > 0) {
      return this.faceDelete<ExampleResponse>(`/api/v1/recognition/faces/${id}`);
    }

    return null;
  }

  /**
   * Delete Multiple Examples
   * @description To delete several subject examples.
   * @since 1.0 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#delete-multiple-examples
   * @param imageIds UUID of the removing face
   * @returns
   */
  deleteMultipleExamples(imageIds: string[]) {
    return this.facePost<ExampleResponse[], string[]>('/api/v1/recognition/faces/delete', imageIds, {
      'Content-Type': 'application/json',
    });
  }

  /**
   * Direct Download an Image example of the Subject by ID
   * @description You can paste this URL into the  html tag to show the image.
   * @since 0.6 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#direct-download-an-image-example-of-the-subject-by-id
   * @param imageId UUID of the image to download
   * @returns Image URL
   */
  DirectImageExample(imageId: string): string {
    return `${this.url}/api/v1/static/${this.key}/images/${imageId}`;
  }

  /**
   * Download an Image example of the Subject by ID
   * @description To download an image example of the Subject by ID.
   * @since 0.6 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#download-an-image-example-of-the-subject-by-id
   * @param imageId UUID of the image to download
   * @param responseType response type
   * @returns Response body is binary image
   */
  downloadImageExample<InputType extends keyof GetFileParams>(imageId: string, responseType: InputType) {
    return this.faceGetFile<InputType>(`/api/v1/recognition/faces/${imageId}/img`, responseType);
  }

  /**
   * Get the path of "Recognize Faces from a Given Image"
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#recognize-faces-from-a-given-image
   * @param options options
   * @returns path
   */
  private joinPathOfRecognizeFaces(options: Omit<RecognizeFacesOptions, 'file' | 'filename'>): string {
    const { limit = 0, detProbThreshold, predictionCount = 1, facePlugins = [], status = false, detectFaces = true } = options;
    let path = `/api/v1/recognition/recognize?limit=${limit}&prediction_count=${predictionCount}&status=${status}&detect_faces=${detectFaces}`;
    if (detProbThreshold != undefined) {
      path += `&det_prob_threshold=${detProbThreshold}`;
    }
    if (facePlugins.length > 0) {
      path += `&face_plugins=${facePlugins?.join(',')}`;
    }

    return path;
  }

  /**
   * Get the full URL of "Recognize Faces from a Given Image"
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#recognize-faces-from-a-given-image
   * @param options options
   * @returns full URL
   */
  getURLOfRecognizeFaces(options: Omit<RecognizeFacesOptions, 'file' | 'filename'>): string {
    return this.url + this.joinPathOfRecognizeFaces(options);
  }

  /**
   * Recognize Faces from a Given Image
   * @description To recognize faces from the uploaded image.
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#recognize-faces-from-a-given-image
   * @param options options
   * @returns
   */
  recognizeFaces(options: RecognizeFacesOptions) {
    const path = this.joinPathOfRecognizeFaces(options);
    const { file, filename } = options;

    if (typeof file === 'string') {
      return this.facePost<RecognizeFacesResponse, { file: string }>(
        path,
        { file },
        {
          'Content-Type': 'application/json',
        }
      );
    } else {
      const formData = new FormData();
      formData.append('file', file, filename);

      return this.facePost<RecognizeFacesResponse, FormData>(path, formData, {
        'Content-Type': 'multipart/form-data',
      });
    }
  }

  /**
   * Recognize Faces from a Given Image, Embedding
   * @description The service is used to determine similarities between input embeddings and embeddings within the Face Collection.
   * @since 1.2.0 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#recognize-faces-from-a-given-image-embedding
   * @param options options
   * @returns
   */
  recognizeFacesByEmbedding(options: RecognizeFacesByEmbeddingOptions) {
    const { embeddings, predictionCount = 1 } = options;
    const path = `/api/v1/recognition/embeddings/recognize?prediction_count=${predictionCount}`;

    return this.facePost<RecognizeFacesByEmbeddingResponse, { embeddings: number[][] }>(
      path,
      { embeddings },
      {
        'Content-Type': 'application/json',
      }
    );
  }

  /**
   * Get the path of "Verify Faces from a Given Image"
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#verify-faces-from-a-given-image
   * @param options options
   * @returns path
   */
  private joinPathOfVerifyFaces(options: Omit<VerifyFacesOptions, 'file' | 'filename'>): string {
    const { imageId, limit = 0, detProbThreshold, facePlugins = [], status = false } = options;
    let path = `/api/v1/recognition/faces/${imageId}/verify?limit=${limit}&status=${status}`;
    if (detProbThreshold != undefined) {
      path += `&det_prob_threshold=${detProbThreshold}`;
    }
    if (facePlugins.length > 0) {
      path += `&face_plugins=${facePlugins?.join(',')}`;
    }

    return path;
  }

  /**
   * Get the full URL of "Verify Faces from a Given Image"
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#verify-faces-from-a-given-image
   * @param options options
   * @returns full URL
   */
  getURLOfVerifyFaces(options: Omit<VerifyFacesOptions, 'file' | 'filename'>): string {
    return this.url + this.joinPathOfVerifyFaces(options);
  }

  /**
   * Verify Faces from a Given Image
   * @description To compare faces from the uploaded images with the face in saved image ID.
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#verify-faces-from-a-given-image
   * @param options options
   * @returns
   */
  verifyFaces(options: VerifyFacesOptions) {
    const path = this.joinPathOfVerifyFaces(options);
    const { file, filename } = options;

    if (typeof file === 'string') {
      return this.facePost<VerifyFacesResponse, { file: string }>(
        path,
        { file },
        {
          'Content-Type': 'application/json',
        }
      );
    } else {
      const formData = new FormData();
      formData.append('file', file, filename);

      return this.facePost<VerifyFacesResponse, FormData>(path, formData, {
        'Content-Type': 'multipart/form-data',
      });
    }
  }

  /**
   * Verify Faces from a Given Image, Embedding
   * @description The endpoint is used to compare input embeddings to the embedding stored in Face Collection.
   * @since 1.2.0 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#verify-faces-from-a-given-image-embedding
   * @param options options
   * @returns
   */
  verifyFacesByEmbedding(options: VerifyFacesByEmbeddingOptions) {
    const { embeddings, imageId } = options;
    const path = `/api/v1/recognition/embeddings/faces/${imageId}/verify`;

    return this.facePost<VerifyFacesByEmbeddingResponse, { embeddings: number[][] }>(
      path,
      { embeddings },
      {
        'Content-Type': 'application/json',
      }
    );
  }
}

export class FaceDetectionService extends CompreFaceBase {
  /**
   * Constructor
   * @param url API URL
   * @param key API key
   */
  constructor(url: string, key: string) {
    super(url, key);
  }

  /**
   * Get the path of "Face Detection Service"
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#face-detection-service
   * @param options options
   * @returns path
   */
  private joinPathOfFaceDetection(options: Omit<FaceDetectionOptions, 'file'>): string {
    const { limit = 0, detProbThreshold, facePlugins = [], status = false } = options;
    let path = `/api/v1/detection/detect?limit=${limit}&status=${status}`;
    if (detProbThreshold != undefined) {
      path += `&det_prob_threshold=${detProbThreshold}`;
    }
    if (facePlugins.length > 0) {
      path += `&face_plugins=${facePlugins?.join(',')}`;
    }

    return path;
  }

  /**
   * Get the full URL of "Face Detection Service"
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#face-detection-service
   * @param options options
   * @returns full URL
   */
  getURLOfFaceDetection(options: Omit<FaceDetectionOptions, 'file'>): string {
    return this.url + this.joinPathOfFaceDetection(options);
  }

  /**
   * Face Detection Service
   * @description To detect faces from the uploaded image.
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#face-detection-service
   * @param options options
   * @returns
   */
  faceDetection(options: FaceDetectionOptions) {
    const path = this.joinPathOfFaceDetection(options);
    const { file } = options;

    if (typeof file === 'string') {
      return this.facePost<FaceDetectionResponse, { file: string }>(
        path,
        { file },
        {
          'Content-Type': 'application/json',
        }
      );
    } else {
      const formData = new FormData();
      formData.append('file', file);

      return this.facePost<FaceDetectionResponse, FormData>(path, formData, {
        'Content-Type': 'multipart/form-data',
      });
    }
  }
}

export class FaceVerificationService extends CompreFaceBase {
  /**
   * Constructor
   * @param url API URL
   * @param key API key
   */
  constructor(url: string, key: string) {
    super(url, key);
  }

  /**
   * Get the path of "Face Verification Service"
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#face-verification-service
   * @param options options
   * @returns path
   */
  private joinPathOfFaceVerification(options: Omit<FaceVerificationOptions, 'sourceImage' | 'targetImage' | 'sourceImageName' | 'targetImageName'>): string {
    const { limit = 0, predictionCount = 1, detProbThreshold, facePlugins = [], status = false } = options;
    let path = `/api/v1/verification/verify?limit=${limit}&prediction_count=${predictionCount}&status=${status}`;
    if (detProbThreshold != undefined) {
      path += `&det_prob_threshold=${detProbThreshold}`;
    }
    if (facePlugins.length > 0) {
      path += `&face_plugins=${facePlugins?.join(',')}`;
    }

    return path;
  }

  /**
   * Get the full URL of "Face Verification Service"
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#face-verification-service
   * @param options options
   * @returns full URL
   */
  getURLOfFaceVerification(options: Omit<FaceVerificationOptions, 'sourceImage' | 'targetImage'>): string {
    return this.url + this.joinPathOfFaceVerification(options);
  }

  /**
   * Face Verification Service
   * @description To compare faces from given two images.
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#face-verification-service
   * @param options options
   * @returns
   */
  async faceVerification(options: FaceVerificationOptions) {
    const path = this.joinPathOfFaceVerification(options);
    const { sourceImage, targetImage, sourceImageName, targetImageName } = options;

    if (typeof sourceImage === 'string' && typeof targetImage === 'string') {
      return this.facePost<FaceVerificationResponse, { source_image: string; target_image: string }>(
        path,
        {
          source_image: sourceImage,
          target_image: targetImage,
        },
        {
          'Content-Type': 'application/json',
        }
      );
    } else if ((sourceImage instanceof File && targetImage instanceof File) || (sourceImage instanceof Blob && targetImage instanceof Blob)) {
      const formData = new FormData();
      formData.append('source_image', sourceImage, sourceImageName);
      formData.append('target_image', targetImage, targetImageName);

      return this.facePost<FaceVerificationResponse, FormData>(path, formData, {
        'Content-Type': 'multipart/form-data',
      });
    } else {
      console.error('The types of files are not uniform!');
      return null;
    }
  }

  /**
   * Face Verification Service, Embedding
   * @description The service is used to determine similarities between an input source embedding and input target embeddings.
   * @since 1.2.0 version
   * @link https://github.com/exadel-inc/CompreFace/blob/master/docs/Rest-API-description.md#face-verification-service-embedding
   * @param options options
   * @returns
   */
  faceVerificationByEmbedding(options: FaceVerificationByEmbeddingOptions) {
    const { source, targets } = options;
    const path = '/api/v1/verification/embeddings/verify';

    return this.facePost<FaceVerificationByEmbeddingResponse, { source: number[]; targets: number[][] }>(
      path,
      {
        source,
        targets,
      },
      {
        'Content-Type': 'application/json',
      }
    );
  }
}
