import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DropzoneController extends Controller {
  @action
  drop() {
    console.log(...arguments);
  }
}
