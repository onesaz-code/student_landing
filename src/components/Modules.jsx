import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  Button,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from '@mui/material';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import HexagonOutlinedIcon from '@mui/icons-material/HexagonOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';

const IconBox = ({ color, children }) => (
  <Box
    sx={{
      width: { xs: 48, sm: 52, md: 56 },
      height: { xs: 48, sm: 52, md: 56 },
      borderRadius: '10px',
      backgroundColor: color,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: { xs: 1.5, sm: 2, md: 2 },
    }}
  >
    {children}
  </Box>
);

const Modules = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollContainerRef = useRef(null);

  const getCardWidth = () => {
    if (isMobile) return '260px';
    if (isTablet) return '300px';
    return '320px';
  };

  const getCardHeight = () => {
    if (isMobile) return '240px'; // Reduced height for mobile
    if (isTablet) return '300px';
    return '320px';
  };

  const getCardsGap = () => (isMobile ? 4 : isTablet ? 6 : 8);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const scrollableWidth = scrollWidth - clientWidth;
      const progress = (scrollLeft / scrollableWidth) * 100;
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
      return () => {
        scrollContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const featureData = [
    {
      title: 'Sms integration',
      iconColor: '#E3F2FD',
      textColor: '#64B5F6',
      description:
        'Send Instant Alerts, Enhance Communication and Reduce Workload. SMS integration for important updates like exam schedules, meetings, updates.',
      icon: <VideocamOutlinedIcon fontSize="large" style={{ color: '#64b5f6' }} />,
      gradient: 'linear-gradient(135deg, #E3F2FD 30%, #64B5F6 100%)',
    },
    {
      title: 'Courses and Batches',
      iconColor: '#FCE4EC',
      textColor: '#EC407A',
      description:
        'Our robust database has capacity to handle 500+ branches and 100,000+ batches effortlessly.',
      icon: <AnalyticsOutlinedIcon fontSize="large" style={{ color: '#ec407a' }} />,
      gradient: 'linear-gradient(135deg, #FCE4EC 30%, #EC407A 100%)',
    },
    {
      title: 'Hr and payroll',
      iconColor: '#F1F8E9',
      textColor: '#AED581',
      description: 'Digital admission process, Easy form submission, Seamless admission tracking.',
      icon: <TouchAppOutlinedIcon fontSize="large" style={{ color: '#aed581' }} />,
      gradient: 'linear-gradient(135deg, #F1F8E9 30%, #AED581 100%)',
    },
    {
      title: 'Id generator',
      iconColor: '#FFF3E0',
      textColor: '#FFB74D',
      description: 'Digital admission process, Easy form submission, Seamless admission tracking.',
      icon: <AssignmentOutlinedIcon fontSize="large" style={{ color: '#ffb74d' }} />,
      gradient: 'linear-gradient(135deg, #FFF3E0 30%, #FFB74D 100%)',
    },
    {
      title: 'Secure login',
      iconColor: '#F3E5F5',
      textColor: '#BA68C8',
      description: 'Digital admission process, Easy form submission, Seamless admission tracking.',
      icon: <QuizOutlinedIcon fontSize="large" style={{ color: '#ba68c8' }} />,
      gradient: 'linear-gradient(135deg, #F3E5F5 30%, #BA68C8 100%)',
    },
  ];

  return (
    <div id="modules">
      <Box
        id="modules"
        sx={{
          width: '100%',
          borderBottom: '0.1px solid white',
          background:
            'linear-gradient(85deg, rgba(0,0,0,1) 0%, rgba(35,65,80,1) 33%, rgba(10,11,22,1) 66%, rgba(39,78,87,1) 100%)',
          color: 'white',
          py: { xs: 2, sm: 3, md: 4 },
          px: { xs: 1.5, sm: 2, md: 3 },
          overflow: 'visible',
          position: 'relative',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ mb: { xs: 2.5, sm: 3, md: 5 }, textAlign: 'left' }}>
            <Typography
              variant="h3"
              fontWeight="500"
              sx={{
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '3rem' },
                fontFamily: 'Poppins, sans-serif',
                mb: { xs: 1.5, sm: 2, md: 2.5 },
              }}
            >
              Modules for
              <Box component="span" sx={{ color: '#4FC3F7' }}>
                {' Streamlined Operations'}
              </Box>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                opacity: 0.7,
                mb: { xs: 2, sm: 2.5, md: 3 },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.2rem' },
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              streamline operations, enhance collaboration, and optimize resource allocation.
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1.5, sm: 2 }, mt: 2 }}>
              <Button
                variant="outlined"
                startIcon={<HexagonOutlinedIcon />}
                sx={{
                  borderRadius: '2rem',
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.2)',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  borderLeft: '3px solid #9a6aff',
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.75, sm: 1 },
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Improve Management Efficiency
              </Button>
              <Button
                variant="outlined"
                startIcon={<FlagOutlinedIcon />}
                sx={{
                  borderRadius: '2rem',
                  color: 'white',
                  borderColor: 'rgba(255,255,255,0.2)',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                  borderLeft: '3px solid #ff9f6a',
                  px: { xs: 1.5, sm: 2 },
                  py: { xs: 0.75, sm: 1 },
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' },
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Enhance Student's Learning
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mb: { xs: 3, sm: 4 },
            }}
          >
            <Box
              ref={scrollContainerRef}
              sx={{
                display: 'flex',
                overflowX: 'auto',
                overflowY: 'hidden',
                gap: getCardsGap(),
                width: '100%',
                pb: 0,
                height: '100%',
                scrollSnapType: 'x mandatory',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                pr: { xs: 15, sm: 30, md: 45 },
              }}
            >
              {featureData.map((feature, index) => (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{
                    p: { xs: 2, sm: 2.5, md: 3 },
                    height: '400px',
                    width: getCardWidth(),
                    bgcolor: 'white',
                    borderRadius: 2,
                    color: 'text.primary',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    scrollSnapAlign: 'start',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    background: feature.gradient,
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: '-20%',
                      left: '-20%',
                      width: '150%',
                      height: '150%',
                      background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)`,
                      transform: 'rotate(45deg)',
                      zIndex: 0,
                    },
                  }}
                >
                  <IconBox color={feature.iconColor} sx={{ zIndex: 1 }}>
                    {feature.icon}
                  </IconBox>
                  <Typography
                    variant="h5"
                    fontWeight="500"
                    gutterBottom
                    color="text.primary"
                    sx={{
                      fontSize: { xs: '1.3rem', sm: '1.5rem', md: '1.8rem' },
                      fontFamily: 'Poppins, sans-serif',
                      mb: { xs: 1.5, sm: 2 },
                      zIndex: 1,
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'text.secondary',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      lineHeight: 1.6,
                      fontFamily: 'Poppins, sans-serif',
                      zIndex: 1,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Box>
          <Box sx={{ width: '100%', mb: 0 }}>
            <LinearProgress
              variant="determinate"
              value={scrollProgress}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#4FC3F7',
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Modules;