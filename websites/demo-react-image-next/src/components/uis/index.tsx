"use client";

import styled from "@emotion/styled";
import type { PropsWithChildren } from "react";

export const Spinner = styled.div`
  height: 15px;
  width: 15px;
  border: 1px solid white;
  border-radius: 50%;
  border-top: none;
  border-right: none;
  margin: 8px auto;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export const Area = ({
  title,
  children,
}: PropsWithChildren<{ title: string }>) => (
  <AreaStyled.Wrapper>
    <AreaStyled.Title>{title}</AreaStyled.Title>
    <AreaStyled.Content>{children}</AreaStyled.Content>
  </AreaStyled.Wrapper>
);

const AreaStyled = {
  Wrapper: styled.div`
    flex: 1;
    max-width: 600px;
  `,
  Content: styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid white;
    border-radius: 16px;
    padding: 6px;
    gap: 8px;
  `,

  Title: styled.h2`
    margin: 0;
    margin-left: 10px;
    margin-bottom: 2px;
    font-size: 14px;
  `,
};

export const Flex = styled.div`
  display: flex;
`;
