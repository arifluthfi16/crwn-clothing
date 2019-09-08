import React from 'react';
import SHOP_DATA from './shop.data';
import PreviewCollection from '../../components/preview-collection/preview-collection.component';

class ShopPage extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        console.log(this.state.collections);
        const {collections} = this.state;
        return (
            <div className='shop-page'>
                {
                    collections.map(({id,...otherCollection})=>(
                        <PreviewCollection key={id} {...otherCollection}/>
                    ))
                }
            </div>
        );
    }
}

export default ShopPage;