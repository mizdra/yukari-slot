import React from 'react';
import styled from 'styled-components';
import { face, hair, hairback } from './lib/parts';

export interface Props {
  children: React.ReactNode;
}

const Container = styled.div<{ hairback: string; face: string }>`
  background-image:
    url("${(props) => props.face}"),
    url("${(props) => props.hairback}");
  display: flex;
  width: 90vw;
  height: 90vw;
  max-width: 512px;
  max-height: 512px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  position:relative;
`;

const Mask = styled.div<{ hair: string }>`
  background-image:
    url("${(props) => props.hair}");
  background-size: contain;
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
`;

export function YukariFace(props: Props) {
  return (
    <Container face={face} hairback={hairback}>
      <Mask hair={hair} />
      {React.Children.map(props.children, (child) => (
        <div
          style={{
            display: 'flex',
            position: 'relative',
            left: '19%',
            top: '30%',
            margin: '0 3%',
            width: '15%',
            height: '25%',
          }}
        >
          {child}
        </div>
      ))}
    </Container>
  );
}
