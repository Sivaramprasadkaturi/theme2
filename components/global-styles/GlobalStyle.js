import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap");

    *{
        padding: 0px;
        margin: 0px;
    }
    :root{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --text1: #212B36;
        --text2:#333;
        --text3:#f00;
        --text4:#fff;
        --border: #f00;
        --btn-color: #F2F6FF;
        --circle-colr: #f00;
        --font-family: 'Noto Sans', sans-serif;
    }
    .theme-blue{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #666cff;
        --bg-topmenu: #666cff;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #666cff;
        --border: #666cff;
        --btn-color: #F2F6FF;
        --circle-colr: #666cff;
        --main-color:#666cff;
        
    }
    .theme-gray{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #6d788d;
        --bg-topmenu: #6d788d;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #6d788d;
        --border: #6d788d;
        --btn-color: #F2F6FF;
        --circle-colr: #6d788d;
        --main-color:#6d788d;
        
    }
    .theme-green{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #72e128;
        --bg-topmenu: #72e128;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #72e128;
        --border: #72e128;
        --btn-color: #F2F6FF;
        --circle-colr: #72e128;
        --main-color:#72e128;
        
    }
    .theme-red{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #ff4d49;
        --bg-topmenu: #ff4d49;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #ff4d49;
        --border: #ff4d49;
        --btn-color: #F2F6FF;
        --circle-colr: #ff4d49;
        --main-color:#ff4d49;
       
    }
    .theme-orange{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fdb528;
        --bg-topmenu: #fdb528;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #fdb528;
        --border: #fdb528;
        --btn-color: #F2F6FF;
        --circle-colr: #fdb528;
        --main-color:#fdb528;
        
    }
    .theme-skyblue{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #26c6f9;
        --bg-topmenu: #26c6f9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #26c6f9;
        --border: #26c6f9;
        --btn-color: #F2F6FF;
        --circle-colr: #26c6f9;
        --main-color:#26c6f9;        
    }
    .theme-EF476F{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #EF476F;
        --bg-topmenu: #EF476F;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #EF476F;
        --border: #EF476F;
        --btn-color: #EF476F;
        --circle-colr: #EF476F;
        --main-color:#EF476F;        
    }
    .theme-FFD166{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #FFD166;
        --bg-topmenu: #FFD166;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #FFD166;
        --border: #FFD166;
        --btn-color: #FFD166;
        --circle-colr: #FFD166;
        --main-color:#FFD166;        
    }
    .theme-06D6A0{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #06D6A0;
        --bg-topmenu: #06D6A0;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #06D6A0;
        --border: #06D6A0;
        --btn-color: #06D6A0;
        --circle-colr: #06D6A0;
        --main-color:#06D6A0;        
    }
    .theme-118AB2{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #118AB2;
        --bg-topmenu: #118AB2;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #118AB2;
        --border: #118AB2;
        --btn-color: #118AB2;
        --circle-colr: #118AB2;
        --main-color:#118AB2;        
    }
    .theme-073B4C{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #073B4C;
        --bg-topmenu: #073B4C;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #073B4C;
        --border: #073B4C;
        --btn-color: #073B4C;
        --circle-colr: #073B4C;
        --main-color:#073B4C;        
    }




    .theme-FFBE0B{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #FFBE0B;
        --bg-topmenu: #FFBE0B;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #FFBE0B;
        --border: #FFBE0B;
        --btn-color: #FFBE0B;
        --circle-colr: #FFBE0B;
        --main-color:#FFBE0B;        
    }
    .theme-FB5607{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #FB5607;
        --bg-topmenu: #FB5607;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #FB5607;
        --border: #FB5607;
        --btn-color: #FB5607;
        --circle-colr: #FB5607;
        --main-color:#FB5607;        
    }
    .theme-FF006E{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #FF006E;
        --bg-topmenu: #FF006E;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #FF006E;
        --border: #FF006E;
        --btn-color: #FF006E;
        --circle-colr: #FF006E;
        --main-color:#FF006E;        
    }
    .theme-8338EC{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #8338EC;
        --bg-topmenu: #8338EC;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #8338EC;
        --border: #8338EC;
        --btn-color: #8338EC;
        --circle-colr: #8338EC;
        --main-color:#8338EC;        
    }
    .theme-3A86FF{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #3A86FF;
        --bg-topmenu: #3A86FF;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #3A86FF;
        --border: #3A86FF;
        --btn-color: #3A86FF;
        --circle-colr: #3A86FF;
        --main-color:#3A86FF;        
    }





    .theme-585123{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #585123;
        --bg-topmenu: #585123;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #585123;
        --border: #585123;
        --btn-color: #585123;
        --circle-colr: #585123;
        --main-color:#585123;        
    }
    .theme-EEC170{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #EEC170;
        --bg-topmenu: #EEC170;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #EEC170;
        --border: #EEC170;
        --btn-color: #EEC170;
        --circle-colr: #EEC170;
        --main-color:#EEC170;        
    }
    .theme-F2A65A{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #F2A65A;
        --bg-topmenu: #F2A65A;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #F2A65A;
        --border: #F2A65A;
        --btn-color: #F2A65A;
        --circle-colr: #F2A65A;
        --main-color:#F2A65A;        
    }
    .theme-F58549{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #F58549;
        --bg-topmenu: #F58549;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #F58549;
        --border: #F58549;
        --btn-color: #F58549;
        --circle-colr: #F58549;
        --main-color:#F58549;        
    }
    .theme-772F1A{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #772F1A;
        --bg-topmenu: #772F1A;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #772F1A;
        --border: #772F1A;
        --btn-color: #772F1A;
        --circle-colr: #772F1A;
        --main-color:#772F1A;        
    }



    .theme-264653{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #264653;
        --bg-topmenu: #264653;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #264653;
        --border: #264653;
        --btn-color: #264653;
        --circle-colr: #264653;
        --main-color:#264653;        
    }
    .theme-2A9D8F{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #2A9D8F;
        --bg-topmenu: #2A9D8F;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #2A9D8F;
        --border: #2A9D8F;
        --btn-color: #2A9D8F;
        --circle-colr: #2A9D8F;
        --main-color:#2A9D8F;        
    }
    .theme-E9C46A{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #E9C46A;
        --bg-topmenu: #E9C46A;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #E9C46A;
        --border: #E9C46A;
        --btn-color: #E9C46A;
        --circle-colr: #E9C46A;
        --main-color:#E9C46A;        
    }
    .theme-F4A261{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #F4A261;
        --bg-topmenu: #F4A261;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #F4A261;
        --border: #F4A261;
        --btn-color: #F4A261;
        --circle-colr: #F4A261;
        --main-color:#F4A261;        
    }
    .theme-E76F51{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #E76F51;
        --bg-topmenu: #E76F51;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #E76F51;
        --border: #E76F51;
        --btn-color: #E76F51;
        --circle-colr: #E76F51;
        --main-color:#E76F51;        
    }




    .theme-FF99C8{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #FF99C8;
        --bg-topmenu: #FF99C8;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #FF99C8;
        --border: #FF99C8;
        --btn-color: #FF99C8;
        --circle-colr: #FF99C8;
        --main-color:#FF99C8;        
    }
    .theme-FCF6BD{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #FCF6BD;
        --bg-topmenu: #FCF6BD;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #FCF6BD;
        --border: #FCF6BD;
        --btn-color: #FCF6BD;
        --circle-colr: #FCF6BD;
        --main-color:#FCF6BD;        
    }
    .theme-D0F4DE{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #D0F4DE;
        --bg-topmenu: #D0F4DE;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #D0F4DE;
        --border: #D0F4DE;
        --btn-color: #D0F4DE;
        --circle-colr: #D0F4DE;
        --main-color:#D0F4DE;        
    }
    .theme-A9DEF9{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #A9DEF9;
        --bg-topmenu: #A9DEF9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #A9DEF9;
        --border: #A9DEF9;
        --btn-color: #A9DEF9;
        --circle-colr: #A9DEF9;
        --main-color:#A9DEF9;        
    }
    .theme-E4C1F9{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #E4C1F9;
        --bg-topmenu: #E4C1F9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #E4C1F9;
        --border: #E4C1F9;
        --btn-color: #E4C1F9;
        --circle-colr: #E4C1F9;
        --main-color:#E4C1F9;        
    }






    .theme-D88C9A{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #D88C9A;
        --bg-topmenu: #D88C9A;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #D88C9A;
        --border: #D88C9A;
        --btn-color: #D88C9A;
        --circle-colr: #D88C9A;
        --main-color:#D88C9A;        
    }
    .theme-F2D0A9{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #F2D0A9;
        --bg-topmenu: #F2D0A9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #F2D0A9;
        --border: #F2D0A9;
        --btn-color: #F2D0A9;
        --circle-colr: #F2D0A9;
        --main-color:#F2D0A9;        
    }
    .theme-F1E3D3{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #F1E3D3;
        --bg-topmenu: #F1E3D3;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #EF476F;
        --border: #F1E3D3;
        --btn-color: #F1E3D3;
        --circle-colr: #F1E3D3;
        --main-color:#F1E3D3;        
    }
    .theme-99C1B9{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #99C1B9;
        --bg-topmenu: #99C1B9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #99C1B9;
        --border: #99C1B9;
        --btn-color: #99C1B9;
        --circle-colr: #99C1B9;
        --main-color:#99C1B9;        
    }
    .theme-8E7DBE{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #8E7DBE;
        --bg-topmenu: #8E7DBE;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #8E7DBE;
        --border: #8E7DBE;
        --btn-color: #8E7DBE;
        --circle-colr: #8E7DBE;
        --main-color:#8E7DBE;        
    }










































    .Source{
        --font-family: Source Sans Pro;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #666cff;
        --bg-topmenu: #666cff;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #666cff;
        --border: #666cff;
        --btn-color: #F2F6FF;
        --circle-colr: #666cff;
        --main-color:#666cff;
    }
    .Roboto{
        --font-family: Roboto;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #6d788d;
        --bg-topmenu: #6d788d;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #6d788d;
        --border: #6d788d;
        --btn-color: #F2F6FF;
        --circle-colr: #6d788d;
        --main-color:#6d788d;
    }
    .Open{
        --font-family: Open Sans;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #72e128;
        --bg-topmenu: #72e128;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #72e128;
        --border: #72e128;
        --btn-color: #F2F6FF;
        --circle-colr: #72e128;
        --main-color:#72e128;
    }
    .Raleway{
        --font-family: Raleway;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #ff4d49;
        --bg-topmenu: #ff4d49;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #ff4d49;
        --border: #ff4d49;
        --btn-color: #F2F6FF;
        --circle-colr: #ff4d49;
        --main-color:#ff4d49;
    }
    .Dancing{
        --font-family: Dancing Script;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fdb528;
        --bg-topmenu: #fdb528;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #fdb528;
        --border: #fdb528;
        --btn-color: #F2F6FF;
        --circle-colr: #fdb528;
        --main-color:#fdb528;
    }
    .Pompiere{
        --font-family: Pompiere;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #26c6f9;
        --bg-topmenu: #26c6f9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #26c6f9;
        --border: #26c6f9;
        --btn-color: #F2F6FF;
        --circle-colr: #26c6f9;
        --main-color:#26c6f9;   
    }

    body{
        background-color: var(--bg-body);
    }

`;

export default GlobalStyle;