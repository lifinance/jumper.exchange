'use client';
import {
  AvatarSkeletonContainer,
  LargeAvatar,
  LargeAvatarSkeletonBase,
  SmallAvatar,
  SmallAvatarSkeletonBase,
} from './Avatar.style';

export const LargeAvatarSkeleton = () => {
  return (
    <AvatarSkeletonContainer>
      <LargeAvatarSkeletonBase variant="circular" />
    </AvatarSkeletonContainer>
  );
};

export const SmallAvatarSkeleton = () => {
  return (
    <AvatarSkeletonContainer>
      <SmallAvatarSkeletonBase variant="circular" />
    </AvatarSkeletonContainer>
  );
};

type AvatarProps = {
  size: 'large' | 'small';
  src: string;
  alt: string;
  children?: React.ReactNode;
};

export const Avatar: React.FC<AvatarProps> = ({ size, src, alt }) => {
  return size === 'large' ? (
    <LargeAvatar src={src} alt={alt} className="avatar" />
  ) : (
    <SmallAvatar src={src} alt={alt} className="avatar" />
  );
};
