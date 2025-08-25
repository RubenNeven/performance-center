import {inject, Injectable} from '@angular/core';
import { Storage, ref, getDownloadURL } from '@angular/fire/storage';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  private storage = inject(Storage);
  downloadUrl?: string;

  async downloadFile(gpxFilePath: string){
    const fileRef = ref(this.storage, gpxFilePath);
    try {
      this.downloadUrl = await getDownloadURL(fileRef);
      return this.downloadUrl;
    } catch (err){
      throw new Error('No file found');
    }
  }
}
