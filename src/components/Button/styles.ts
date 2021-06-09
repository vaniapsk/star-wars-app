import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
background: blueviolet;
color: white;
font-size: 16px;
transition: background-color 0.2s;
height: 40px;
width: 100%;
font-weight: bold;
border-radius: 10px;
border: 0;
//align-self: flex-end;

:hover{
    background: ${shade(0.2, 'blueviolet')};
}
`;
