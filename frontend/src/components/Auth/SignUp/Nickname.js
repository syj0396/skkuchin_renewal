import { useState, useEffect } from "react";
import {  TextField, Button, InputLabel, Typography, Box, FormControl, Select, MenuItem, Container, Grid, Autocomplete, OutlinedInput} from '@mui/material';
import back from '../../../image/arrow_back_ios.png';
import close from '../../../image/close.png';
import Image from 'next/image';
import { useRouter } from "next/router";
import { check_nickname } from "../../../actions/auth/auth";
import { register } from '../../../actions/auth/auth';
import { useDispatch } from 'react-redux';
import { Loading } from '../../Loading';

const SignUpNickname = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [validNickname, setValidNickname] = useState(null);
    const [nicknameMsg, setNicknameMsg] = useState("");
    const [validSId, setValidSId] = useState(null);

    const majorList = [
      '경영학과', '글로벌경영학과', '앙트레프레너십연계전공', '경제학과','국제통상학전공', '소비자학과',
      '글로벌경제학과', '통계학과', '건설환경공학부', '건축학과', '기계공학부',
      '나노공학과', '시스템경영공학과', '신소재공학부', '화학공학/고분자공학부', '국어국문학과', '독어독문학과',
      '러시아어문학과', '문헌정보학과', '사학과', '영어영문학과', '중어중문학과',
      '철학과', '프랑스어문학과', '한문학과', '교육학과', '수학교육과',
      '컴퓨터교육과', '한문교육과', '글로벌리더학부', '미디어커뮤니케이션학과',
      '사회복지학과', '사회학과', '심리학과',
      '아동청소년학과', '정치외교학과', '행정학과', '바이오메카트로닉스학과', '식품생명공학과', '융합생명공학과', '글로벌바이오메디컬공학과', 
      '글로벌융합학부', '데이터사이언스융합전공', '인공지능융합전공', '컬처앤테크놀로지융합전공', '자기설계융합전공',
      '유학동양학과', '미술학과', '디자인학과', '무용학과', '영상학과', '연기예술학과', '의상학과', 
      '소프트웨어학과', '생명과학과', '수학과', '물리학과', '화학과', '전자전기공학부', '반도체시스템공학과', '소재부품융합공학과', '약학과', '스포츠과학과', '의학과', '컴퓨터공학과',
      '인문과학계열', '사회과학계열', '자연과학계열', '공학계열'
    ];
    const phoneNumList = ['010']

    const handlePrevStep = () => {
      props.handlePrevStep();
    }

    const checkNickname = (next) => {
      if (props.data.nickname.length > 10) {
        setLoading(false);
        setValidNickname(false);
        setNicknameMsg("닉네임은 최대 10자까지 가능합니다.")
        return;
      }
      check_nickname(props.data.nickname, ([result, message]) => {
        //setLoading(false);
        setValidNickname(result);
        if (result) {
          if (next) {
            props.handleNextStep();
            /*dispatch(register(props.data, ([result, message]) => {
              setLoading(false);
              if (result) {
                props.handleNextStep();
              } else {
                console.log(message);
              }
            }))*/
          }
        } else {
          if (typeof(message) == 'string') {
            setNicknameMsg(message);
          }
        }
        setLoading(false);
      })
    }

    const tempSignUp = () => {
      dispatch(register(props.data, ([result, message]) => {
        setLoading(false);
        if (result) {
          console.log(message);
          props.handleNextStep();
        } else {
          console.log(message);
        }
      }))
    }

    const handleNextStep = () => {
      setLoading(true);
      checkNickname(true);
    }

    const handleNicknameChange = (e) => {
      if (validNickname != null) {
        setValidNickname(null);
      }
      props.setData({...props.data, nickname: e.target.value})
    }

    const validateSId = (sId) => {
      let isNum = /^\d+$/.test(sId)
      if (sId == "") {
        setValidSId(null)
      }
      else if (!isNum || sId < 10 || sId > 24) {
        setValidSId(false)
      } else {
        setValidSId(true)
      }
    }

    const handleStudentIdChange = (e) => {
      let sId = e.target.value
      props.setData({...props.data, student_id: sId})

      validateSId(sId);
    } 



    useEffect(() => {
      if (props.data.nickname !== '') {
        checkNickname(false);
        validateSId(props.data.student_id);
      }
    }, [])


    return (
      <div>
        <Container style={{padding:'0px', alignItems: 'center', marginTop: '45px'}}>
                        <Grid container justifyContent='space-between'>
                            <Grid item style={{margin:'4px 0px 0px 24px', visibility:'none'}}>
                                <Image src={back} width={8} height={16} name='back' onClick={handlePrevStep} layout='fixed' />
                            </Grid>
                            <Grid item style={{marginRight:'24px'}}>
                                <Image src={close} width={25} height={25} name='close' onClick={() => router.push('/login')} layout='fixed' />
                            </Grid>
                        </Grid>
        </Container>
      <Box
        sx={{
        margin: '35px 0px 55px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        }}
    >
      <form style={{ width: '100%'}}>
        <div style={{margin: '0 24px 100px'}}>
        <Grid container>
                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                <Typography style={{fontSize: '26px', color: '#FFCE00', marginRight: '7px'}}>&bull;</Typography>
                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                <Typography style={{fontSize: '26px', color: '#E2E2E2', marginRight: '7px'}}>&bull;</Typography>
                </Grid>
                <Typography style={{fontSize: '24px', fontWeight: '900', marginBottom: '12px', color: '#3C3C3C'}}>개인정보 입력</Typography>

                <Typography style={{fontSize: '14px', marginTop: '35px', color: '#3C3C3C'}}>닉네임</Typography>
                <input
                    variant="standard"
                    placeholder="닉네임 (최대 10자)"
                    value={props.data.nickname}
                    onChange={handleNicknameChange}
                    style={{
                        fontSize: '16px',
                        padding: '20px 15px 21px 12px',
                        height: '56px',
                        border: '1px solid #E2E2E2',
                        margin: '8px 0 0px 0',
                        borderRadius: '8px',
                        width: '100%',
                        outline: 'none'
                    }}
                />
            <div style={{display:'flex'}}>
              {/* <Button variant="contained" onClick={checkNickname} style={{backgroundColor: '#FFCE00', color: '#fff', borderRadius: '8px', width: '47px', height: '20px', fontSize: '9px', padding: '3px 4px', marginTop: '4px', boxShadow: 'none'}}>중복확인</Button> */}
              {/* {validNickname == null && <Typography sx={{fontSize: '12px', fontWeight: '500', color: '#3C3C3C', margin: '5px 0 0 5px'}}>닉네임 중복 확인 체크를 해주세요</Typography>} */}
              {/* {validNickname && <Typography sx={{fontSize: '12px', fontWeight: '500', color: '#12A054', margin: '5px 0 0 5px'}}>{nicknameMsg}</Typography>} */}
              {validNickname == false ? <Typography sx={{fontSize: '12px', fontWeight: '500', color: '#F47806', marginTop: '6px'}}>{nicknameMsg}</Typography> : <div style={{height: '24px'}}></div>}
            </div>

            {/* 학번 */}
            <Grid container style={{marginTop: '16px'}}>
            <FormControl variant="standard" style={{width: '27%'}}>
              <Typography style={{paddingBottom: '4px', fontSize: '14px', color: '#3C3C3C', }}>학번</Typography>
              <Grid container>
              <input
                  variant="standard"
                  placeholder=""
                  value={props.data.student_id}
                  //onClick={e => setDialogOpen(false)}
                  onChange={(e, value) => handleStudentIdChange(e, value)}
                  style={{
                      fontSize: '18px',
                      color: '#3C3C3C',
                      padding: '16px 0px 16px 12px',
                      height: '56px',
                      border: '1px solid #E2E2E2',
                      borderRight: validSId == false ? '#fff' : 'white',
                      borderRadius: '8px 0 0 8px',
                      width: '50%',
                      outline: 'none'
                  }}
              />
              <input
                  readOnly
                  value='학번'
                  style={{
                      fontSize: '16px',
                      color: '#BABABA',
                      textAlign: 'end',
                      padding: '16px 12px 16px 0px',
                      height: '56px',
                      border: '1px solid #E2E2E2',
                      borderLeft: validSId == false ? '#fff' : 'white',
                      borderRadius: '0 8px 8px 0',
                      width: '50%',
                      outline: 'none'
                  }}
              />
              </Grid>
            </FormControl>

            {/* 학과 */}
            <FormControl variant="standard" style={{width: '73%'}}>
            <Typography style={{paddingBottom: '4px', fontSize: '14px', color: '#3C3C3C', marginLeft: '8px'}}>학부/학과</Typography>
            <Autocomplete
              //disablePortal
              value={props.data.major}
              sx={{
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none'
                },
                '& input': {
                  fontSize: '16px',
                  padding: '0'
                },
                height: '56px',
                border: '1px solid #E2E2E2',
                borderRadius: '8px',
                outline: 'none',
                appearance: 'none',
                marginLeft: '8px',
                fontSize: '16px',
                padding: '0'
              }}
              onChange={(e, value) => props.setData({...props.data, major: value})}
              options={majorList.sort()}
              renderInput={(params) => <TextField {...params} style={{fontSize: '12px'}} />} 
            />
          </FormControl>
          </Grid>
          {validSId === false && <Typography style={{color: '#F47806', fontSize: '12px', margin: '4px 0 0 4px'}}>다른 학번을 입력해주세요</Typography>}
        </div>
        
        </form>
        <div style={{position: 'fixed', bottom: '0', display: 'grid', width: '100%', maxWidth: '420px', backgroundColor: '#fff', paddingTop: '30px', paddingBottom: '32px'}}>
        {(props.data.nickname != '' && validNickname != false && majorList.indexOf(props.data.major) != -1 && validSId) ?
                    <Button variant="contained" onClick={handleNextStep} style={{margin: '0 24px', width: '88%', backgroundColor: "#FFCE00", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        다음
                    </Button>
                :
                    <Button variant="contained" disabled style={{margin: '0 24px', width: '88%', backgroundColor: "#E2E2E2", color: '#fff', fontSize: '16px', fontWeight: '700',  borderRadius: '8px', height: '56px', boxShadow: 'none'}}>
                        다음
                    </Button>
            }
        <div style={{display: 'flex', flexDirection: 'column',  fontSize: '12px', fontWeight: '500', paddingTop: '20px', color: '#505050', textAlign: 'center'}}>
            <span style={{alignSelf: 'center'}}>이미 회원이신가요?<Button onClick={() => router.push('/login')} variant="text" style={{alignSelf: 'start', justifySelf: 'start', fontSize: '12px', color: '#FFCE00', padding: 0, fontWeight: '700', textDecoration: 'underline'}}>로그인하기</Button></span>
        </div>
        </div>
      </Box>
      {loading && <Loading />}
      </div>
    );
  };

  export default SignUpNickname;