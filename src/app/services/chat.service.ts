import {Injectable} from '@angular/core';
import {io, Socket} from "socket.io-client";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private url = 'ws://localhost:4000/chat'; // your server local path
  constructor() {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: any): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{ user: string, message: string }>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() {
    const storage: any = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data: any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }
}
