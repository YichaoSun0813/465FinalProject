import React, { Component } from 'react';

const pTagStyle = {
    fontSize: '40px',
    color: '#768c34',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '10em',
    width: '20em',
    display: 'flex',
};
 
//the landing page takes a list of quotes and displays
//a random one on the site
export default class Landing extends Component {
    constructor(props) {
        super(props);

        this.quotes = [
                'How many apples fell on Newtons head before he took the hint? Nature is always hinting at us. It hints over and over again. And suddenly we take the hint.',
                'How cunningly nature hides every wrinkle of her inconceivable antiquity under roses and violets and morning dew!',
                'Nature is trying very hard to make us succeed, but nature does not depend on us. We are not the only experiment.',
                'In general, mankind, since the improvement of cookery, eats twice as much as nature requires',
                'Food is about agriculture, about ecology, about mans relationship with nature, about the climate, about nation-building, cultural struggles, friends and enemies, alliances, wars, religion. It is about memory and tradition and, at times, even about sex',
                'Of all the wonders of nature, a tree in summer is perhaps the most remarkable; with the possible exception of a moose singing ‘Embraceable You’ in spats',
                'Nature gives to every time and season some beauties of its own; and from morning to night, as from the cradle to the grave, it is but a succession of changes so gentle and easy that we can scarcely mark their progress',
                'Nature will castigate those who dont masticate',
                'Seating themselves on the greensward, they eat while the corks fly and there is talk, laughter and merriment, and perfect freedom, for the universe is their drawing room and the sun their lamp. Besides, they have appetite, Natures special gift, which lends to such a meal a vivacity unknown indoors, however beautiful the surroundings',
                'We were not satisfied with the qualities which nature gave to poultry; art stepped in and, under the pretext of improving fowls, has made martyrs of them',
                'Food for all is a necessity. Food should not be a merchandise, to be bought and sold as jewels are bought and sold by those who have the money to buy. Food is a human necessity, like water and air, it should be available',
                'Man has to eat to live; and to this primary condition of life he raises no particular objection. Man, indeed, eats and drinks with gusto; and not unfrequently, let it be confessed, without actual necessity'
            ];
    }
   
    displayQuote = () => {
        let max = this.quotes.length;
        let elem = Math.floor(Math.random() * Math.floor(max));
        return this.quotes[elem];
    }

    render() {
        return (
           <p style={pTagStyle}>{this.displayQuote()}</p> 
        );
    }
}