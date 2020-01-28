/** @jsx jsx */
import { jsx, Styled } from "theme-ui";

export interface AvatarProps {
  image: string;
  size: "small" | "large";
}

export const Avatar = ({ image, size }: AvatarProps) => (
  <Styled.div
    sx={{
      width: size === "large" ? [8, 8, 8] : 6,
      height: size === "large" ? [8, 8, 8] : 6,
      borderRadius: "50%",
      padding: 2,
      minWidth: size === "large" ? [8, 8, 8] : 6,
    }}
    css={{
      backgroundImage: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  />
);
