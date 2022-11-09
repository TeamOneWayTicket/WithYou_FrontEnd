export const needDefaultImage = (image: string): string => {
  if (!image || image === '' || image === 'null' || image === 'undefined') {
    return '/static/default_profile.svg';
  }
  return image;
};

const ratioCandidates = [
  { width: 1, height: 1 },
  { width: 4, height: 3 },
  { width: 16, height: 9 },
];

export const getRandomImageRadio = () => {
  const randomIndex = Math.floor(Math.random() * ratioCandidates.length);
  return ratioCandidates[randomIndex];
};
