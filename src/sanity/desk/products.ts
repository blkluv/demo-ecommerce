import {ListItemBuilder} from 'sanity/desk';
import defineStructure from '../utils/defineStructure';
import {InfoOutlineIcon} from '@sanity/icons';
import {previewPane} from './preview';

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Products')
    .schemaType('product')
    .child(
      S.documentTypeList('product')
        // .defaultLayout('detail')
        .child(async (id) =>
          S.list()
            .title('Product')
            .items([
              // Details
              S.listItem()
                .title('Details')
                .icon(InfoOutlineIcon)
                .child(
                  S.document()
                    .schemaType('product')
                    .documentId(id)
                    .views([S.view.form(), previewPane(S)]),
                ),
              // Product variants
              S.listItem()
                .title('Variants')
                .schemaType('productVariant')
                .child(
                  S.documentList()
                    .title('Variants')
                    .schemaType('productVariant')
                    .filter(
                      `
                      _type == "productVariant"
                      && store.productId == $productId
                    `,
                    )
                    .params({
                      productId: Number(id.replace('shopifyProduct-', '')),
                    }),
                ),
            ]),
        ),
    ),
);
