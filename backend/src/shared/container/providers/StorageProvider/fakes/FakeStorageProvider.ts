import IStorageProvider from '../models/IStorageProvider';

export default class FakeStorageProvider implements IStorageProvider {
  private storageProvider: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.storageProvider.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const getIndex = this.storageProvider.findIndex(item => item === file);

    this.storageProvider.splice(getIndex, 1);
  }
}
