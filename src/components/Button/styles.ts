import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
background: blueviolet;
color: white;
font-size: 16px;
transition: background-color 0.2s;
font-weight: bold;
border-radius: 5px;
border: 0;

:hover{
    background: ${shade(0.2, 'blueviolet')};
}
`;
