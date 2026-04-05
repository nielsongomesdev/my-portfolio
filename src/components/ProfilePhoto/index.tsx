import Image from "next/image";

interface ProfilePhotoProps {
  wrapperClassName?: string;
  imageClassName?: string;
}

export const ProfilePhoto = ({
  wrapperClassName = "",
  imageClassName = "",
}: ProfilePhotoProps) => {
  return (
    <div className={`relative overflow-visible ${wrapperClassName}`}>
      <Image
        src="/profile.png"
        alt="Foto de perfil"
        width={819}
        height={1229}
        className={`absolute bottom-0 left-0 block h-full w-auto max-w-none object-contain ${imageClassName}`}
        priority
      />
    </div>
  );
};
