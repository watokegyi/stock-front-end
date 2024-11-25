import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
 
  ProductVariant,
 
} from '../models/product.model';

@Component({
  selector: 'app-product-from',
  templateUrl: './product-from.component.html',
  styleUrls: ['./product-from.component.css'],
})
export class ProductFromComponent implements OnInit {
  productForm: FormGroup;
  generatedVariants: ProductVariant[] = [];
  colorOptions = ['Red', 'Blue', 'Green', 'Yellow', 'Orange'];
  sizeOptions = ['S', 'M', 'L', 'XL'];
  apiUrl = 'http://localhost:3000/api/products';
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  id: number | undefined;
  deleteids: number[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      productname: ['', Validators.required],
      sku: ['', Validators.required],
      colors: [[], Validators.required],
      size: [[], Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = Number(params.get('id'));
      if (this.id) {
        this.isEditMode = true;
        this.loadProductData(this.id);
        console.log(this.id);
      } else {
        this.isEditMode = false;
      }
      console.log(this.generatedVariants);
    });
  }

  onGenerate(): void {
    const { productname, sku, colors, size } = this.productForm.value;

    if (!productname || !sku || !colors.length || !size.length) {
      alert('Please fill in all required fields!');
      return;
    }

    colors.forEach((color: string) => {
      size.forEach((size: string) => {
        const exists = this.generatedVariants.some(
          (variant) => variant.color === color && variant.size === size
        );

        if (!exists) {
          this.generatedVariants.push({
            product_name: `${productname}-${color}-${size}`,
            sku: `${sku}-${color[0]}-${size}`,
            color,
            size,
            quantity: undefined,
            price: undefined,
          });
        }
      });
    });
  }

  saveall() {
    this.createOrupdateProductKproduct();
  }

  onFileSelect(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.generatedVariants[index].previewimage = e.target.result;
        this.productForm.patchValue({ imgurl: e.target.result });
      };
      reader.readAsDataURL(this.selectedFile);
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      this.http
        .post<{ filepath: string }>(`${this.apiUrl}/imageUpload`, formData)
        .subscribe(
          (response) => {
            console.log('Response:', response.filepath);
            this.generatedVariants[index].imgurl = response.filepath;
          },
          (error) => {
            console.error('Error uploading image', error);
          }
        );
    }
  }

  onChangeProductname(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.generatedVariants[index].product_name = inputElement.value;
    }
  }

  onChangeSKU(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.generatedVariants[index].sku = inputElement.value;
    }
  }

  onChangeColor(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.generatedVariants[index].color = inputElement.value;
    }
  }

  onChangeSize(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.generatedVariants[index].size = inputElement.value;
    }
  }

  onChangeQuantity(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.generatedVariants[index].quantity = parseFloat(inputElement.value);
    }
  }

  onChangePrice(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      this.generatedVariants[index].price = parseFloat(inputElement.value);
    }
  }

  
  deleteprouct(index: any) {
    if (this.isEditMode) {
      this.deleteids.push(this.generatedVariants[index].no!);
      this.generatedVariants.splice(index, 1);
    } else {
      this.generatedVariants.splice(index, 1);
    }
  }

  deleteall() {
    this.generatedVariants = [];
    this.productForm.reset({
      productname: '',
      sku: '',
      colors: [],
      size: [],
      description: '',
    });
  }

  clearForm() {
    if (this.isEditMode) {
      this.generatedVariants = [];
      this.loadProductData(this.id);
    } else {
      this.generatedVariants = [];
      this.router.navigate(['']);
    }
  }

  roughttoList() {
    this.generatedVariants = [];
    this.router.navigate(['']);
  }
  loadProductData(id: any) {
    this.productService.findProductsByProductKind({ id: id }).subscribe(
      (response) => {
        if (response) {
          console.log('Data successfully loaded:', response);
          const productData = response.data[0];
          const productKind = productData.productKind;
          const productArray = productData.productArray;
          if(Array.isArray(productArray) && productArray.some((item) => item !== null)){
            console.log(productArray);
            productArray.forEach((product: any) => {
              const variantvalue: ProductVariant = {
                product_name: product.product_name,
                sku: product.sku,
                color: product.color,
                size: product.size,
                imgurl: product.imgurl,
                quantity: product.quantity,
                product_t_id: product.product_t_id,
                price: product.price,
                no: product.no,
              };
              this.generatedVariants.push(variantvalue);
              console.log(product.product_name);
            });
          }
         
          this.productForm.patchValue({
            productname: productKind.productname || [''],
            sku: productKind.sku || [''],
            colors: Array.isArray(productKind.colors)
              ? productKind.colors
              : [productKind.colors],
            size: Array.isArray(productKind.size)
              ? productKind.size
              : [productKind.size],
            description: productKind.description || [''],
          });

          console.log('Product Kind:', productKind);
          console.log('Product Array:', productArray);
        } else {
          console.log('No data found for this product kind.');
        }
      },
      (error) => {
        console.error('Error loading data:', error.message || 'Unknown error');
      }
    );
  }

  createOrupdateProductKproduct() {
    const isProductFormInitial =
      !this.productForm.value.productname &&
      !this.productForm.value.sku &&
      this.productForm.value.colors.length === 0 &&
      this.productForm.value.size.length === 0 &&
      !this.productForm.value.description;

    if (this.generatedVariants.length === 0 && isProductFormInitial) {
      if (this.id) {
        this.productService.deleteAllproductAndPK(this.id).subscribe(
          () => {
            console.log(`Deleted products with id: ${this.id}`);
            this.router.navigate(['']);
          },
          (error) => {
            console.error(
              'Error deleting product kind and associated products:',
              error
            );
          }
        );
      } else {
        console.error('Error: `id` is undefined');
      }
    } else if (this.productForm.valid) {
      const productData = this.productForm.value;
      const generatedVariants = this.generatedVariants.map((variant) => ({
        product_name: variant.product_name,
        sku: variant.sku,
        color: variant.color,
        size: variant.size,
        imgurl: variant.imgurl!,
        quantity: variant.quantity!,
        product_t_id: variant.product_t_id!,
        price: variant.price!,
        no: variant.no!,
      }));

      const payload = {
        productData,
        generatedVariants,
        deleteVariantIds: this.deleteids,
      };
      this.productService
        .createOrupdateProductWithVariants(this.id, payload)
        .subscribe(
          (response) => {
            console.log(
              'Product and associated variants updated successfully:',
              response
            );
            this.deleteall();
            this.router.navigate(['']);
          },
          (error) => {
            console.error(
              'Error updating product and associated variants:',
              error
            );
          }
        );
    } else {
      console.log('Form is invalid, cannot update product');
    }
  }

 
}
