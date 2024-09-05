import { DateTime } from 'luxon';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import BackgroundImageMan from '../../../../assets/no_photo_man.svg';
import BackgroundImageWoman from '../../../../assets/no_photo_woman.svg';
import { declOfNum } from '../../../../shared/helpers';
import {
  ProfileCardWrap,
  ProfileImage,
  ProfileRating,
  RatingLabel,
  RatingValue,
  ProfileNameWrap,
  ProfileName,
  ProfileAge,
  ProfileOnline,
  ProfileSubject,
  ProfileAdditionalSubjects,
  ProfileActivityTime
} from './styles';
import { SUBJECTS_VARIANTS, HOURS_VARIANTS } from './constants'
import { IProfile } from './types';

export const ProfileCard = (
  {
    rating,
    name,
    age,
    onlineStatus,
    defaultSubjectName,
    subjectsCount,
    photoUrl,
    sex,
    lastActivityTime
  }: IProfile
) => {

  const profileImage = photoUrl ? photoUrl : sex === 1 ? BackgroundImageMan : BackgroundImageWoman;
  const profileRating = rating > 0 ? rating : 'NEW';
  const currentDate = DateTime.now();
  const activityTime = DateTime.fromISO(lastActivityTime)
  const dif = currentDate.diff(activityTime, ['months', 'days', 'hours'])
  const notMoreThanSixHoursAgo = dif.months === 0 && dif.days === 0 && dif.hours <= 6;
  const isMobile = useMediaQuery('(max-width: 899px)');

  return (
    <ProfileCardWrap>
      <ProfileImage image={profileImage}>
        <ProfileRating>
          <RatingLabel>рейтинг</RatingLabel>
          <RatingValue>{profileRating}</RatingValue>
        </ProfileRating>
      </ProfileImage>
      <ProfileNameWrap>
        <ProfileName>{name}, </ProfileName>
        <ProfileAge>{age}</ProfileAge>
        {onlineStatus === 2 ? <ProfileOnline /> : ''}
      </ProfileNameWrap>
      <Box display="flex">
        <ProfileSubject>{defaultSubjectName}</ProfileSubject>
        {!isMobile && subjectsCount > 0 && <ProfileAdditionalSubjects>и еще {subjectsCount} {declOfNum(subjectsCount, SUBJECTS_VARIANTS)}</ProfileAdditionalSubjects>}
      </Box>
      {!isMobile && notMoreThanSixHoursAgo && <ProfileActivityTime>{sex === 1 ? 'был' : 'была'} на сайте {Math.floor(dif.hours)} {declOfNum(Math.floor(dif.hours), HOURS_VARIANTS)} назад </ProfileActivityTime>}
    </ProfileCardWrap >
  )
}