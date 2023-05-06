


import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-photo-modal',
  templateUrl: './photo-modal.page.html',
  styleUrls: ['./photo-modal.page.scss'],
})
export class PhotoModalPage implements OnInit {
  @Input() title: string;
  @Input() photoUrl: string;

  constructor(private modalController: ModalController) {}
  ngOnInit(): void {

  }

  closeModal() {
    this.modalController.dismiss();
  }
}
