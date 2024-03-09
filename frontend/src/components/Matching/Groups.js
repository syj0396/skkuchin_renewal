import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react"; 
import { Button, Card, Typography, Grid} from '@mui/material';
import { displayMBTI } from './MBTIList';
import noCharacter from '../../image/mbti/profile/noCharacter.png'
import { useRouter } from 'next/router';
import Image from 'next/image';
import GoLogin from "../GoLogin";
import { load_all_group_profile, get_my_group_profile } from "../../actions/groupProfile/groupProfile";
import ErrorPopup from "../Custom/ErrorPopup";

const dummyProfiles = [
    {
        groupName: '그룹명1',
        gender: '여',
        mbti: 'GROUP',
        introduction:
            '그룹 한줄 소개입니다',
    },
    {
        groupName: '그룹명2',
        gender: '남',
        mbti: 'GROUP',
        introduction:
            '긴 그룹 한줄 소개 입니다. 긴 그룹 한줄 소개 입니다. 긴 그룹 한줄 소개 입니다. 👀',
    },
    {
        groupName: '그룹명3',
        gender: '남',
        mbti: 'GROUP',
        introduction:
            '그룹 한줄 소개입니다 👀',
    },

];

const Groups = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    const user = useSelector(state => state.matchingUser.matchingUser);
    const groupProfiles = useSelector(state => state.groupProfile.allGroupProfiles);
    const myGroupProfiles = useSelector(state => state.groupProfile.myGroupProfiles);
    const requestId = useSelector(state => state.chatRoom.requestId);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [isLogin, setIsLogin] = useState(false);

    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [popupBtnText, setPopupBtnText] = useState('');

    useEffect(() => {
        if(groupProfiles === null) dispatch(load_all_group_profile(isAuthenticated));
        if (myGroupProfiles === null) dispatch(get_my_group_profile());
    }, [isAuthenticated]);
    
    const handleSettingOpen = () => {
        if (isAuthenticated) {
            router.push({
                pathname: '/makeGroupProfile',
                query: { src : '스꾸챗프로필설정', }
            });
        } 
    }
    const handleRequestBtnClick = (id, name) => {
        if(isAuthenticated) {
            if (myGroupProfiles && myGroupProfiles.length > 0) {
                localStorage.setItem('candidateId', id);
                localStorage.setItem('candidateName', name);
                router.push('/selectMyGroupProfile')
            }
            else {
                setPopupMessage('그룹 밥약을 신청하기 위해선\n그룹 프로필 작성이 필요해요.');
                setPopupBtnText('그룹 프로필 등록하기');
                setPopupOpen(true);
            }
        } else {
            setPopupMessage('밥약 신청을 위해서는 로그인이 필요해요.');
            setPopupBtnText('로그인하러 가기');
            setPopupOpen(true);
        }
    }

    const handleGroupClick = (id) => {
        router.push(`/showGroupProfile?id=${id}`);
    }

    const filteredProfiles = myGroupProfiles ? groupProfiles && groupProfiles.filter((group) => !myGroupProfiles.some((myGroup) => myGroup.id == group.id)) : groupProfiles;
    
    return (
        <Grid container sx={{overflowX: 'auto', flexWrap: 'nowrap', p: '0px', m: '0'}}>
            {isLogin && <GoLogin open={isLogin} onClose={setIsLogin} /> }
            { filteredProfiles && filteredProfiles.length !== 0 ?
                filteredProfiles.slice(0,5).map((group, index) => (
                        <Card key={index} variant="outlined" sx={{height: 'max-content', width: '242px', borderRadius: '10px', border: '1px solid #E2E2E2', p: '28px 16px', flexShrink: 0, mr: '19px', mb: '10px'}}>
                            <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                                {displayMBTI('GROUP', 90, 90)}
                                <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: '20px 0px 8px'}}>
                                    <Typography sx={{fontSize: '20px', fontWeight: '700', mr: '5px'}}>{group !== null && group.group_name}</Typography>
                                    <Typography sx={{p: '3px 7px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', backgroundColor: (group.gender).charAt(0) === '여' ? '#FFF4F9' : '#E8F9FF', color: (group.gender).charAt(0) === '여' ? '#FAA4C3' : '#83B6F2'}}>
                                        {(group.gender).charAt(0)}
                                    </Typography>
                                </Grid>
                                <Typography sx={{ fontSize: '14px', height: '40px', lineHeight: '20px', fontWeight: 400, color: '#3C3C3C', m: '20px 0 30px', textAlign: 'center', overflow: 'hidden', display: '-webkit-box', WebkitBoxOrient: 'vertical', WebkitLineClamp: 2 }}>
                                    {'"'+ group.group_introduction +'"'}
                                </Typography>
                                <Grid item sx={{ display: 'flex',  alignItems: 'center', width: '100%', justifyContent: 'center' }}>
                                    <Button
                                        disableElevation
                                        disableTouchRipple
                                        key="profile-button"
                                        onClick={() => handleGroupClick(group.id)}
                                        sx={{ color: '#777777', fontSize: '14px', fontWeight: 700, textAlign: 'center', pr: '15px'}}
                                    >
                                        그룹 프로필
                                    </Button>
                                    <div style={{ width: '2px', height: '12px', backgroundColor: '#E2E2E2', borderRadius: '10px'}} />
                                        {requestId && requestId.includes(group.id) ? (
                                            <Button
                                                disableElevation
                                                disableTouchRipple
                                                key="completed-button"
                                                sx={{ color: '#505050', fontSize: '14px', fontWeight: 700, textAlign: 'center', pl: '15px'}}
                                            >
                                                신청 완료
                                            </Button>
                                        ) : (
                                            <Button
                                                disableElevation
                                                disableTouchRipple
                                                key="apply-button"
                                                onClick={() => handleRequestBtnClick(group.id, group.group_name)}
                                                sx={{ color: '#FFAC0B', fontSize: '14px', fontWeight: 700, textAlign: 'center', pl: '15px' }}
                                            >
                                                밥약 걸기
                                            </Button>
                                        )}
                                </Grid>
                            </Grid>
                        </Card> 
                ))

            :
            <>
                { filteredProfiles && filteredProfiles.length === 0 &&
                    dummyProfiles.map((group, index) => (
                    <Card key={index} variant="outlined" sx={{height: 'max-content', width: '242px', borderRadius: '10px', border: '1px solid #E2E2E2', p: '28px 16px', flexShrink: 0, mr: '19px', mb: '21px'}}>
                        <Grid container direction="column" sx={{justifyContent: 'center', alignItems: 'center'}}>
                            <Image src={noCharacter} width={80} height={80} placeholder="blur" layout='fixed' />
                            <Grid item sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: '20px 0px 8px'}}>
                                <Typography sx={{fontSize: '20px', fontWeight: '700', mr: '5px'}}>{group !== null && group.groupName}</Typography>
                                <Typography sx={{p: '3px 7px', borderRadius: '10px', fontWeight: 'bold', fontSize: '12px', backgroundColor: (group.gender).charAt(0) === '여' ? '#FFF4F9' : '#E8F9FF', color: (group.gender).charAt(0) === '여' ? '#FAA4C3' : '#83B6F2'}}>
                                    {(group.gender).charAt(0)}
                                </Typography>
                            </Grid>
                            <Grid item sx={{width: '169px', textAlign: 'center', pb: '8px'}}>
                                <Typography sx={{ fontSize:'13px', fontWeight: '500', whiteSpace: 'pre-wrap'}}>
                                    {
                                        user?.matching === false ?
                                        '성대 학우와 채팅을 나누시려면\n\n[마이페이지]에서\n매칭 ON/OFF 버튼을 켜주세요 👀' 
                                        : '성대 학우와 채팅을 나누시려면 매칭 프로필을 등록해주세요 👀'
                                    }
                                </Typography>
                            </Grid>
                            {
                                (isAuthenticated === false || user === null || user?.matching ) === false ? null
                                :
                                <Button onClick={()=>handleSettingOpen()}  sx={{backgroundColor: '#FFCE00', borderRadius: '30px', color: '#fff', fontSize: '12px', fontWeight: '700', textAlign: 'center', p: '8.5px 11.5px', m : '5px 0px'}}>
                                    프로필 등록하기
                                </Button>
                            }
                        </Grid>
                    </Card>
                ))}
            </>
            }

            <ErrorPopup
                open={popupOpen}
                handleClose={() => setPopupOpen(false)}
                message={popupMessage}
                btnText={popupBtnText}
                onConfirm={() => {
                    setPopupOpen(false);
                    if (popupBtnText === '그룹 프로필 등록하기') {
                        router.push('/makeGroupProfile');
                    } else if (popupBtnText === '로그인하러 가기') {
                        router.push('/login');
                    }
                }}
            />
    </Grid>
    )
}

export default Groups;