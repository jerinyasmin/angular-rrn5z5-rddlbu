import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, ValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay } from 'rxjs/operators';
import { atLeastOneCheckboxCheckedValidator } from ".././atLeastOneCheckboxCheckedValidator";

@Component({
  selector: 'app-profile-editor',
  templateUrl: './profile-editor.component.html',
  styleUrls: [ './profile-editor.component.css' ]
})
export class ProfileEditorComponent  {
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
      rate_method: ["20", Validators.required]
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
    })
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
    console.log({ groupVal: this.categoriesFormGroupSelectedIds, }, null, 2);
    
  }

  getCategories(): Observable<ProductCategory[]> {
    let categories: ProductCategory[] = [
       { id: 0, title: 'Commonly used methods within the class' },
    { id: 1, title: 'Essential basic functions of the class' },
    { id: 2, title: 'Frequently misused methods within the class' },
    { id: 3, title: 'Efficient method among similar functions' },
    { id: 4, title: 'Methods carrying advanced features of the API' },
    { id: 5, title: 'Other' }
    ];
    return of(categories).pipe(delay(1000));
  }


  getSentences(): Observable<ProductCategory[]> {
    let sentences: ProductCategory[] = [
      { id: 0, title: 'Performs the given action for each element of the Iterable until all elements have been processed or the action throws an exception.' },
      { id: 1, title: 'Unless otherwise specified by the implementing class, actions are performed in the order of iteration (if an iteration order is specified).'},
      { id: 2, title: 'Exceptions thrown by the action are relayed to the caller.'}
    ];
    return of(sentences).pipe(delay(1000));
  }
}
                                                  
interface ProductCategory {
  id: number;
  title: string;
}