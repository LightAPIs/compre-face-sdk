import 'mocha';
import { expect } from 'chai';
import { FaceRecognitionService, FaceDetectionService, FaceVerificationService } from '@/index';
import { url as apiUrl, key as apiKey } from './env.json';
import fs from 'fs';

describe('Face Recognition Service Test', function () {
  this.timeout(30000);

  const frs = new FaceRecognitionService(apiUrl, apiKey.recognition);

  after(async function () {
    await frs.deleteAllSubjects();
  });

  it('"Add a Subject" success.', async function () {
    const addData = await frs.addASubject('Test1');
    expect(addData).to.have.property('subject', 'Test1');
  });

  it('"Rename a Subject" success.', async function () {
    const renameData0 = await frs.renameASubject('Test1', 'Test0');
    expect(renameData0).to.have.property('updated', true);

    await frs.addASubject('Test2');
    const renameData1 = await frs.renameASubject('Test2', 'Test0');
    expect(renameData1).to.have.property('updated', true);

    const renameData2 = await frs.renameASubject('Test0', 'Test0');
    expect(renameData2).to.have.property('updated', false);
  });

  it('"Delete a Subject" success.', async function () {
    const deleteData = await frs.deleteASubject('Test0');
    expect(deleteData).to.have.property('subject', 'Test0');
  });

  it('"List Subjects" success.', async function () {
    const arr = ['Test1', 'Test2', 'Test3'];
    for (const item of arr) {
      await frs.addASubject(item);
    }
    const listData = await frs.listSubjects();
    expect(listData).to.have.property('subjects').members(arr);
  });

  it('"Delete All Subjects" success.', async function () {
    const delData1 = await frs.deleteAllSubjects();
    expect(delData1).to.have.property('deleted', 3);

    const delData2 = await frs.deleteAllSubjects();
    expect(delData2).to.have.property('deleted', 0);
  });

  it('"Add an Example of a Subject" success.', async function () {
    const boyFile = 'images/ai_boy.jpg';

    const boy = fs.readFileSync(boyFile);
    const addBlobData = await frs.addAnExample('BlobBoy', {
      file: new Blob([boy]),
      filename: 'ai_boy.jpg',
    });
    expect(addBlobData).to.have.property('image_id');
    expect(addBlobData).to.have.property('subject', 'BlobBoy');

    const base64Boy = fs.readFileSync(boyFile, { encoding: 'base64' });
    const addBase64Data = await frs.addAnExample('Base64Boy', {
      file: base64Boy,
    });
    expect(addBase64Data).to.have.property('image_id');
    expect(addBase64Data).to.have.property('subject', 'Base64Boy');
  });

  it('"List of All Saved Examples of the Subject" success.', async function () {
    const listData = await frs.listOfAllExamples({
      subject: 'BlobBoy',
    });
    expect(listData).to.have.property('faces').length(1);

    const listAllData = await frs.listOfAllExamples();
    expect(listAllData).to.have.property('faces').length(2);

    const nobodyData = await frs.listOfAllExamples({
      subject: 'Nobody',
    });
    expect(nobodyData).to.have.property('faces').length(0);
  });

  it('"Delete All Examples of the Subject by Name" success.', async function () {
    const delBlobData = await frs.deleteAllExamplesOfTheSubject('BlobBoy');
    expect(delBlobData).to.have.property('deleted', 1);

    const delNobodyData = await frs.deleteAllExamplesOfTheSubject('Nobody');
    expect(delNobodyData).to.have.property('deleted', 0);

    // const delAllData = await frs.deleteAllExamples();
    // expect(delAllData).to.have.property('deleted', 1);
  });

  it('"Delete an Example of the Subject by ID" success.', async function () {
    const svaedData = await frs.listOfAllExamples({
      subject: 'Base64Boy',
    });
    const imageId = svaedData?.faces[0].image_id;
    const delData = await frs.deleteAnExample(imageId!);
    expect(delData).to.have.property('subject', 'Base64Boy');
    expect(delData).to.have.property('image_id', imageId);
  });

  it('"Delete Multiple Examples" success.', async function () {
    const boyFile = 'images/ai_boy.jpg';
    const base64Boy = fs.readFileSync(boyFile, { encoding: 'base64' });
    const imageIds: string[] = [];
    for (let i = 0; i < 2; i++) {
      const resData = await frs.addAnExample('Base64Boy', {
        file: base64Boy,
      });
      if (resData?.image_id) {
        imageIds.push(resData.image_id);
      }
    }

    const delData = await frs.deleteMultipleExamples(imageIds);
    expect(delData).to.have.lengthOf(imageIds.length);
  });

  it('"Recognize Faces from a Given Image" success.', async function () {
    for (let i = 1; i <= 5; i++) {
      const base64Female = fs.readFileSync(`images/ai_female_${i}.jpg`, { encoding: 'base64' });
      await frs.addAnExample('Female' + i, {
        file: base64Female,
      });
    }

    const base64Face = fs.readFileSync(`images/ai_boy.jpg`, { encoding: 'base64' });
    const resData = await frs.recognizeFaces({
      file: base64Face,
      facePlugins: ['age', 'calculator', 'gender', 'landmarks', 'mask', 'pose'],
      status: true,
    });
    expect(resData).to.have.property('result');
    expect(resData).to.have.property('plugins_versions');

    const embedding = resData?.result[0].embedding;
    const embedRes = await frs.recognizeFacesByEmbedding({
      embeddings: [embedding!],
    });
    expect(embedRes).to.have.property('result');
  });

  it('"Verify Faces from a Given Image" success.', async function () {
    const svaedData = await frs.listOfAllExamples({
      subject: 'Female1',
    });
    const imageId = svaedData?.faces[0].image_id;
    const base64Face = fs.readFileSync(`images/ai_boy.jpg`, { encoding: 'base64' });

    const resData = await frs.verifyFaces({
      file: base64Face,
      imageId: imageId!,
      facePlugins: ['calculator'],
    });
    expect(resData).to.have.property('result');

    const embedding = resData?.result[0].embedding;
    const embedRes = await frs.verifyFacesByEmbedding({
      embeddings: [embedding!],
      imageId: imageId!,
    });
    expect(embedRes).to.have.property('result');
  });
});

describe('Face Detection Service Test', function () {
  this.timeout(30000);

  const fds = new FaceDetectionService(apiUrl, apiKey.detection);

  it('"Face Detection Service" success.', async function () {
    const base64Face = fs.readFileSync(`images/ai_boy.jpg`, { encoding: 'base64' });
    const resData = await fds.faceDetection({
      file: base64Face,
    });
    expect(resData).to.have.property('result');
  });
});

describe('Face Verification Service Test', function () {
  this.timeout(30000);

  const fvs = new FaceVerificationService(apiUrl, apiKey.verify);

  it('"Face Verification Service" success.', async function () {
    const base64Face = fs.readFileSync(`images/ai_boy.jpg`, { encoding: 'base64' });
    const resData = await fvs.faceVerification({
      sourceImage: base64Face,
      targetImage: base64Face,
      facePlugins: ['calculator'],
    });
    expect(resData).to.have.property('result');

    const embedding = resData?.result[0].source_image_face.embedding;
    const embedRes = await fvs.faceVerificationByEmbedding({
      source: embedding!,
      targets: [embedding!],
    });
    expect(embedRes).to.have.property('result');
  });
});
