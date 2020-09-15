import React from 'react';
import "./Home.css";
import Product from "./Product";

function Home() {
    return (
    <div className='home'>
        <div className="home_container">
                <img className="home_image"
                src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg" alt=""/>
            
            <div className="home_row">
                <Product 
                id="23432341"
                title='Orgain Organic Plant Based Protein Powder, Creamy Chocolate Fudge - Vegan, Low Net Carbs, Non Dairy, Gluten Free, Lactose Free, No Sugar Added, Soy Free, Kosher, Non-GMO, 2.03 Pound' price={26.99} 
                image='https://cdn.shopify.com/s/files/1/0074/0832/0621/products/851770006026-v4-ProteinPowder-2.03lb-ChocolatePeanutButter-Front-HIRES-shopify_800px_1296x.jpg?v=1597446447' 
                rating={5}/>
                <Product 
                id="49538094"
                title="NutriBullet 1000 Watt PRIME Edition, 12-Piece High-Speed Blender/Mixer System, Includes Stainless Steel Insulated Cup, and Recipe Book"
                price={129.95}
                rating={4}
                image="https://nbmedia.imgix.net/NB-00.jpg?auto=compress%2Cformat&ixlib=php-1.2.1&h=800"
                />
            </div>
            <div className="home_row">
                <Product
                id="4903850"
                title="Apple AirPods with Charging Case (Wired)"
                price={129.98}
                rating={5}
                image="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MV7N2?wid=1144&hei=1144&fmt=jpeg&qlt=95&op_usm=0.5%2C0.5&.v=1551489688005"
                />
                <Product 
                id="23445930"
                title="Stasher 100% Silicone Reusable Food Bag, Sandwich, Aqua"
                price={11.99}
                rating={4}
                image="https://cdn.shopify.com/s/files/1/2237/5935/products/Bundle_StandupAquaTrio_2800x2800-1_900x.jpg?v=1599059548"
                />
                <Product
                id="3254354345"
                title="Think and Grow Rich: The Landmark Bestseller Now Revised and Updated for the 21st Century (Think and Grow Rich Series)"
                price={4.29}
                rating={5}
                image="https://books.google.com/books/content/images/frontcover/kF0NvkqWIyAC?fife=w400-h600"
                />
            </div>
            <div className="home_row">
                <Product 
                id="90829332"
                title="TCL 50S425 50 inch 4K Smart LED Roku TV (2019)"
                price={279.50}
                rating={3}
                image="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6302/6302321_sd.jpg;maxHeight=640;maxWidth=550"
                />
            </div>
        </div>
    </div>
    )
}

export default Home
