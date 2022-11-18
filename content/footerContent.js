const footerContent = () => { 
    return {
        about: [
            {
                parent: { attributes: {} },
                children: [
                    {
                        attributes: {
                            to: `/terms-of-use`
                        },
                        text: "Terms Of Use"
                    },
                    {
                        attributes: {
                            to: `/shipping-information`
                        },
                        text: "Shipping Information"
                    },
                    {
                        attributes: {
                            to: `/return-policy`
                        },
                        text: "Return Policy"
                    },
                    {
                        attributes: {
                            to: `/privacy-policy`
                        },
                        text: "Privacy Policy"
                    }
                ]
            }
        ],

        shop: [
            {
                parent: { attributes: {} },
                children: [
                    {
                        attributes: {
                            href: `mailto:bilgi@starter.com`
                        },
                        text: "E-mail : bilgi@starter.com"
                    },
                    {
                        attributes: {
                            target: "_blank",
                            to: `/contact-us`
                        },
                        text: "Contact Us"
                    },
                    {
                        attributes: {
                            to: `/seller-registration`
                        },
                        text: "Seller Sign Up"
                    }
                ]
            }
        ],
        socialMedia: [
            {
                parent: { attributes: { className: "socialMedia" } },
                children: [
                    {
                        attributes: {
                            target: "_blank",
                            href: "https://www.facebook.com/avetticommerce",
                            rel : "noopener noreferrer"
                        },
                        image: `Facebook`
                    },
                    {
                        attributes: {
                            target: "_blank",
                            href: "https://www.linkedin.com/",
                            rel : "noopener noreferrer"
                        },
                        image: `Linkedin`
                    },

                    {
                        attributes: {
                            target: "_blank",
                            href: "https://www.twitter.com/avetticom",
                            rel : "noopener noreferrer"
                        },
                        image: `Twitter`
                    }
                ]
            }
        ]
    };
}

export default footerContent;