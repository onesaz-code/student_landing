import React from "react";
import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Chip,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  Divider,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

const offerings = [
  "28 comprehensive tests (including Minor, Semi-Major, and Major) designed as per the latest JEE (Advanced + Main) syllabus",
  "Missed tests can be retaken for continued learning",
  "Unlimited re-attempts for each paper to strengthen concepts",
  "Detailed solutions provided for every test to aid understanding",
  "Create your own quizzes from ONESAZ's extensive question bank",
  "Exclusive ONESAZ App features: personalized study tools, flashcards, and more",
  "Course access valid until 31st May 2026",
];

const phases = [{ label: "Phase 1 starting 1st June 2025", value: 3 }];

const aboutFeatures = [
  {
    title: "Real Exam Experience",
    points: [
      "Practice with high-quality question papers crafted by ONESAZ subject experts",
      "Stay on track with structured and consistent test schedules",
      "Improve your time management and test-taking skills for better results",
    ],
    icon: "🧑‍💻",
  },
  {
    title: "Flexible Practice",
    points: [
      "Take tests at your convenience within a 24-hour window from anywhere",
      "Re-attempt any test, including those you missed, as many times as needed",
    ],
    icon: "💻",
  },
  {
    title: "Smart Revision Tools",
    points: [
      "Access detailed solutions and performance insights for every test",
      "Identify and improve weak areas using ONESAZ's smart revision features",
    ],
    icon: "🧠",
  },
  {
    title: "National Ranking",
    points: [
      "See where you stand with national-level rankings among ONESAZ learners",
      "Track your progress and compare with peers across India",
    ],
    icon: "🏆",
  },
];

export default function Pricing() {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background: "#f5f7fa",
        minHeight: "100vh",
        p: 4,
      }}
    >
      <Box>
        <Grid container spacing={4} justifyContent="center">
          {/* Left Side */}
          <Grid item xs={12} md={7}>
            <Chip
              label="ONLINE TEST SERIES"
              color="success"
              sx={{ mb: 2, fontWeight: 600 }}
            />
            <Typography variant="h5" fontWeight={700} gutterBottom>
              JEE (Adv + Main) Online Test Series: Target 2026
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Class 12 • 1 Year
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <Box mr={1}>
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    background: "#fff",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: 1,
                  }}
                >
                  <span role="img" aria-label="subjects">
                    📚
                  </span>
                </Box>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Subjects
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  Chemistry, Maths, Physics
                </Typography>
              </Box>
            </Box>
            <Typography variant="h6" fontWeight={700} gutterBottom>
              Program Offerings
            </Typography>
            <List dense>
              {offerings.map((item, idx) => (
                <ListItem key={idx} sx={{ pl: 0, pb: 0 }}>
                  <Typography variant="body1">• {item}</Typography>
                </ListItem>
              ))}
            </List>
            <Box mt={4}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                About the Course
              </Typography>
              <Grid container spacing={2}>
                {aboutFeatures.map((feature, idx) => (
                  <Grid item xs={12} key={idx}>
                    <Card
                      sx={{
                        background: "#fff",
                        borderRadius: 3,
                        boxShadow: "none",
                        border: "1px solid #e0e7ef",
                        p: 2,
                        display: "flex",
                        alignItems: "flex-start",
                        minHeight: 120,
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: 40,
                          mr: 2,
                          mt: 0.5,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          fontWeight={600}
                          gutterBottom
                        >
                          {feature.title}
                        </Typography>
                        <List dense sx={{ pl: 2 }}>
                          {feature.points.map((point, i) => (
                            <ListItem
                              key={i}
                              sx={{ display: "list-item", p: 0, mb: 0.5 }}
                            >
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {point}
                              </Typography>
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
            {/* FAQ and Refund Policy Buttons */}
            <Grid container spacing={2} mt={5} mb={3}>
              <Grid item xs={12} md={6}>
              <Button
                variant="contained"
                color="info"
                startIcon={<DownloadIcon />}
                sx={{
                  background: "#e9f2ff",
                  color: "#1a237e",
                  borderRadius: 2,
                  boxShadow: "none",
                  fontWeight: 600,
                  fontSize: 16,
                  px: 3,
                  py: 1.5,
                  "&:hover": { background: "#d0e3ff" },
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                Download Syllabus
                <DownloadIcon sx={{ ml: 1 }} />
              </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowForwardIosIcon />}
                  sx={{
                    background: "#fff",
                    borderRadius: 2,
                    fontWeight: 600,
                    justifyContent: "space-between",
                    px: 2,
                    py: 1.5,
                  }}
                  onClick={() => navigate("/refund-policy")}
                >
                  Refund Policy
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* Right Side - Pricing Card */}
          <Grid item xs={12} md={4}>
            <Box sx={{ position: "sticky", top: 32, zIndex: 2 }}>
              <Card sx={{ borderRadius: 3, p: 2, minWidth: 320 }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700} gutterBottom>
                    Annual Fee
                  </Typography>
                  <Box display="flex" alignItems="baseline" mb={1}>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      color="primary.main"
                    >
                      ₹ 9500
                    </Typography>
                    <Typography variant="body2" color="text.secondary" ml={1}>
                      + ₹ 1710 Taxes
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body2" fontWeight={600} mb={1}>
                    Select starting date
                  </Typography>
                  {phases.map((phase, idx) => (
                    <Button
                      key={idx}
                      variant="outlined"
                      fullWidth
                      sx={{ mb: 1 }}
                      onClick={() => setSelectedPhase(phase)}
                      color={
                        selectedPhase?.value === phase.value
                          ? "primary"
                          : "default"
                      }
                      size="small"
                    >
                      {phase.label}
                    </Button>
                  ))}
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                    mb={2}
                  >
                    * Missed tests will be available for re-attempt
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={!selectedPhase}
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
