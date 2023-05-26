import { serverIP } from '../config/config';
export const combineImagePaths = (imagePaths) => {
  return imagePaths.map((imagePath) => {
    const modifiedPath = imagePath.path.replace(
      'http://localhost:4000',
      `http://${serverIP}:4000`
    );
    return modifiedPath;
  });
};
