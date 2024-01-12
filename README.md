# compre-face-sdk

Exadel CompreFace Rest API TypeScript SDK.

## Installation

```shell
npm install @dragonish/compre-face-sdk
```

## Usage

### Face Recognition Service

```typescript
import { FaceRecognitionService } from '@dragonish/compre-face-sdk';

const frs = new FaceRecognitionService('<api url>', '<api key>');
```

#### Methods

| Method name | Description |
| --- | --- |
| `addASubject()` | Add a Subject |
| `renameASubject()` | Rename a Subject |
| `deleteASubject()` | Delete a Subject |
| `deleteAllSubjects()` | Delete All Subjects |
| `listSubjects()` | List Subjects |
| `getURLOfAddAnExample()` | Get the full URL of "Add an Example of a Subject" |
| `addAnExample()` | Add an Example of a Subject |
| `listOfAllExamples()` | List of All Saved Examples of the Subject |
| `deleteAllExamplesOfTheSubject()` | Delete All Examples of the Subject by Name |
| `deleteAnExample()` | Delete an Example of the Subject by ID |
| `deleteMultipleExamples()` | Delete Multiple Examples |
| `DirectImageExample()` | Direct Download an Image example of the Subject by ID |
| `downloadImageExample()` | Download an Image example of the Subject by ID |
| `getURLOfRecognizeFaces()` | Get the full URL of "Recognize Faces from a Given Image" |
| `recognizeFaces()` | Recognize Faces from a Given Image |
| `recognizeFacesByEmbedding()` | Recognize Faces from a Given Image, Embedding |
| `getURLOfVerifyFaces()` | Get the full URL of "Verify Faces from a Given Image" |
| `verifyFaces()` | Verify Faces from a Given Image |
| `verifyFacesByEmbedding()` | Verify Faces from a Given Image, Embedding |

### Face Detection Service

```typescript
import { FaceDetectionService } from '@dragonish/compre-face-sdk';

const fds = new FaceDetectionService('<api url>', '<api key>');
```

#### Methods

| Method name | Description |
| --- | --- |
| `getURLOfFaceDetection()` | Get the full URL of "Face Detection Service" |
| `faceDetection()` | Face Detection Service |

### Face Verification Service

```typescript
import { FaceVerificationService } from '@dragonish/compre-face-sdk';

const fvs = new FaceVerificationService('<api url>', '<api key>');
```

#### Methods

| Method name | Description |
| --- | --- |
| `getURLOfFaceVerification()` | Get the full URL of "Face Verification Service" |
| `faceVerification()` | Face Verification Service |
| `faceVerificationByEmbedding()` | Face Verification Service, Embedding |

## Credits

- [exadel-inc/CompreFace](https://github.com/exadel-inc/CompreFace)

## License

[MIT](./LICENSE)
