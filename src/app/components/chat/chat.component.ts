import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public roomId!: string;
  public messageText!: string;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray: Array<any> = [];

  // public phone!: string;
  public currentUser: any = {
    id: 1,
    name: 'Customer',
    phone: '12345',
    image: 'assets/user/user-1.png',
    roomId: {
      2: 'room-1'
    }
  };
  public selectedUser!: any;

  public userList = [
    {
      id: 2,
      name: 'Admin',
      phone: '9876543210',
      image: 'assets/user/user-2.png',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5'
      }
    }
  ];

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chatService.getMessage()
      .subscribe((data: { user: string, room: string, message: string }) => {
        // this.messageArray.push(data);
        if (this.roomId) {
          setTimeout(() => {
            this.storageArray = this.chatService.getStorage();
            const storeIndex = this.storageArray
              .findIndex((storage: any) => storage.roomId === this.roomId);
            this.messageArray = this.storageArray[storeIndex].chats;
          }, 500);
        }
      });
  }

  selectUserHandler(phone: string): void {
    this.selectedUser = this.userList.find(user => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.currentUser.id];
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage: any) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: this.roomId,
      message: this.messageText
    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage: any) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.name,
          message: this.messageText
        }]
      };

      this.storageArray.push(updateStorage);
    }

    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }

}
