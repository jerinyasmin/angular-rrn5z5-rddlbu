import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay } from 'rxjs/operators';
import { atLeastOneCheckboxCheckedValidator } from ".././atLeastOneCheckboxCheckedValidator";

import * as fs from 'fs';

@Component({
  selector: 'app-name-editor',
  templateUrl: './name-editor.component.html',
  styleUrls: [ './name-editor.component.css' ]
})
export class NameEditorComponent  {
 

  categories: ProductCategory[];
  // sentences: ProductSentence[];

  form: FormGroup;
  show: boolean;
  

  constructor(private formBuilder: FormBuilder) { }

  get f() {
    return this.form && this.form.controls;
  }


  get categoriesFormGroup(): FormGroup {
    return this.f && <FormGroup>this.f.categoriesFormGroup
  }

  get categoriesFormGroupSelectedIds(): string[] {
    let ids: string[] = [];
    for (var key in this.categoriesFormGroup.controls) {
      if (this.categoriesFormGroup.controls[key].value) {
        ids.push(key);
      }
    }
    return ids;
  }

  get sentencesFormGroup(): FormGroup {
    return this.f && <FormGroup>this.f.sentencesFormGroup
  }

  get sentencesFormGroupSelectedIds(): string[] {
    let ids: string[] = [];
    for (var key in this.sentencesFormGroup.controls) {
      if (this.sentencesFormGroup.controls[key].value) {
        ids.push(key);
      }
    }
    return ids;
  }

  showFull(): void {
    if (this.form.value["rate_method"] > 50) {
          this.show = true;
    } else {
      this.show = false;
    }
  }

  ngOnInit(): void {
    // this.isLoadingCategory = true;
    this.show = false;
    this.form = this.formBuilder.group({
      rate_method: ["2", Validators.required]
    });
    this.getCategories().subscribe(categories => {
      // this.isLoadingCategory = false;
      this.categories = categories;
      // this.form.addControl("categoriesFormArr", this.buildCategoryFormArr(categories));
      this.form.addControl("categoriesFormGroup", this.buildCategoryFormGroup(categories));
    });
     this.getSentences().subscribe(sentences => {
      // this.isLoadingCategory = false;
      this.sentences = sentences;
    
      this.form.addControl("sentencesFormGroup", this.buildCategoryFormGroup(sentences));
    });

      let path = __dirname+'\\my.txt';
      //console.log(path);

      fs.open(path, 'r', function(err, fd) {
        console.log(path);
        if (err) {
            throw 'could not open file: ' + err;
        }
       
        
        });
        // fs.read(path, fd , (err) => { 
        // console.log();
        // // In case of a error throw err. 
        // if (err) throw err; 
          
  }

  buildCategoryFormGroup(categories: ProductCategory[], selectedCategoryIds: string[] = []): FormGroup {
    let group = this.formBuilder.group({}, {
      validators: atLeastOneCheckboxCheckedValidator()
    });
    categories.forEach(category => {
      let isSelected = selectedCategoryIds.some(id => id === category.id);
      group.addControl(category.id, this.formBuilder.control(isSelected));
    })
    return group;
  }


  



  onSubmit() {

    let path = __dirname+'/my.txt';
    console.log(path);
let buffer = new Buffer('Those who wish to follow me\nI welcome with my hands\nAnd the red sun sinks at last');

// open the file in writing mode, adding a callback function where we do the actual writing
fs.open(path, 'w', function(err, fd) {
    if (err) {
        throw 'could not open file: ' + err;
    }

    // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
    fs.write(fd, buffer, 0, buffer.length, null, function(err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function() {
            console.log('wrote the file successfully');
        });
    });
    let ROOT_APP_PATH = fs.realpathSync('.'); 
    console.log(ROOT_APP_PATH);
});
    // console.log(this.form.value);
    
    // var writeRequest = new XMLHttpRequest(); 
    // var url = '/test/my.txt'; 
    // writeRequest.open('POST', url, true); 
    // // writeRequest.setRequestHeader('Content-type', 'application/json'); 
    // if(writeRequest.readyState == 4 && writeRequest.status == 200) { 
    //   alert("Saving Data To File ..."); 
    //   writeRequest.send("testing"); 
    // } 
    // else { 
    //   alert("Connection FAIL,\nCheck connection and Retry !!!"); 
    //   console.log(writeRequest); 
    // } 
    // writeRequest.send("testing");    

    // const fileName = 'src/app/name-editor/my.txt';
    // console.log(__dirname);
    // console.log(process.cwd());

    // fs.writeFile(__dirname + '/name-editor.component.css', "text", 'utf8', err => { if (err)
    //       return console.log(err.message);})



    // fs.readFile(process.cwd() + "/test/my.txt", 'utf8', function (err, data) {
    //   if (err)
    //       return console.log(err.message);

    //   console.log('result read: ' + data);
    // });  
    
  }

 
  getCategories(): Observable<ProductCategory[]> {
    let categories: ProductCategory[] = [
       { id: 0, title: 'Commonly used methods within the class' },
    { id: 1, title: 'Essential basic functions of the class' },
    { id: 2, title: 'Frequently misused methods within the class' },
    { id: 3, title: 'Efficient method among similar functions' },
    { id: 4, title: 'Methods carrying advanced features of the API' },
    {id: 5, title: 'Other'}
    ];
    return of(categories).pipe(delay(1000));
  }


  getSentences(): Observable<ProductCategory[]> {
    let sentences: ProductCategory[] = [
    { id: 0, title: 'Inserts the specified element at the specified position in this list.'},
    { id: 1, title: 'Shifts the element currently at that position (if any) and any subsequent elements to the right (adds one to their indices).'}
    ];
    return of(sentences).pipe(delay(1000));
  }
}
                                                  
interface ProductCategory {
  id: number;
  title: string;
}