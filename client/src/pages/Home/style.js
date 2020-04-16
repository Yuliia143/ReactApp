import styled from 'styled-components';

export const LectionWrapper = styled.div`
    .slick-arrow{
        background-color: #80808070;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        z-index: 1;
    }
    .slick-slide{
        width: 242px;
        height: 280px;
        padding-left: 21px;
    }
    .slick-track{
        height: 295px;
    }
    .slick-list{
        width: 100%;
    }
 
`;

export const LectionWrapperNav = styled.div`
    .slick-arrow{
        background-color: #80808070;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        z-index: 1;
    }
    .slick-slide{
        height: 283px;
        outline: none;
    }
    .slick-list{
        height: 283px;
        width: 813px;
        outline: none;

    }
   
    .slick-prev{
        margin-left:12px;
    }
    .slick-next{
        margin-right: 3px;
    }
 
`;