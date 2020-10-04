import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = props => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={product && product.description && product.description}
      className='container-fluid'
    >
      <div className='row'>
        <div className='ml-5 col-4'>
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
        </div>
        <div className='col-6'>
          <h2>{product.title}</h2>
          <p className='text-justify'>{product.description}</p>
        </div>
      </div>
      <h4 className='m-4'>Related products</h4>
      <div className='row'>
        {relatedProduct.map((p, i) => (
          <div className='col-3'>
            <Card key={i} product={p} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Product;
