import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import MedicalInformationIcon from "@mui/icons-material/MedicalInformation";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddIcon from "@mui/icons-material/Add";
import CreateMemberModal from "../../components/modal/CreateMemberModal";
import { createFamilyMember, getFamilyMembers } from "../../redux/actions/familyMemberActions";
import { notify } from "../../utils/HelperFunctions";
import { useDispatch, useSelector } from "react-redux";
import FamilyMemberCard from "../../components/cards/FamilyMemberCard";
import FeatureCard from "../../components/cards/FeatureCard";


const Home = () => {

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({});
  const { familyMembers, familyLoading, familyError } = useSelector(
    (state) => state.familyMember
  );

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getFamilyMembers());

  }, [dispatch]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.relation.trim() || !formData.age.trim() || !formData.gender.trim()) {
      notify("error", "All Fields required")
      return
    }

    await dispatch(createFamilyMember(formData)).then((msg) => notify("success", msg));
    dispatch(getFamilyMembers()); // Refresh list after adding
    setOpenModal(false);
    setFormData({ memberName: "", relation: "", age: "", gender: "" });
  };

  const features = [
    {
      icon: (
        <MedicalInformationIcon sx={{ fontSize: 50, color: "#1976d2" }} />
      ),
      title: "Store & Manage Reports",
      desc: "Upload and organize all your medical reports securely in one place.",

    },
    {
      icon: <InsertChartIcon sx={{ fontSize: 50, color: "#009688" }} />,
      title: "AI Insights",
      desc: "Get intelligent analysis and insights based on your uploaded health data.",

    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 50, color: "#e57373" }} />,
      title: "Track Your Vitals",
      desc: "Record blood pressure, sugar, and other vitals to monitor your health trends.",

    },
  ]



  return (
    <Box sx={{ backgroundColor: "#f8fafb", minHeight: "100vh", pb: 10 }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #40b77d, #34a3c8)",
          color: "white",
          textAlign: "center",
          py: 10,
          px: 2,
        }}
      >
        <Typography
          fontWeight="bold"
          variant="h3"
          gutterBottom
          sx={{ letterSpacing: 1, fontSize: { xs: "2rem", sm: "3rem", md: "3rem" } }}
        >
          Your Digital Health Partner
        </Typography>
        <Typography
          variant="h6"
          sx={{
            maxWidth: 700,
            mx: "auto",
            opacity: 0.9,
            lineHeight: 1.6,
            fontSize: { xs: "16px", sm: "1rem", md: "1rem" },
          }}
        >
          Empowering you to take control of your health with smart storage,
          tracking, and AI-driven insights.
        </Typography>
      </Box>

      {/* Family Members Section */}
      <Box sx={{ mt: { xs: 5, sm: 10, md: 10 }, px: { xs: 1, sm: 10, md: 10 } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            mb: 3,
            gap: 1
          }}
        >
          <Typography variant="h4" fontWeight="bold" color="text.primary" sx={{ fontSize: { xs: '28px', sm: '2.3rem', md: '2.3rem' } }}>
            Family Members
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#34a3c8",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "#2d8ab0",
              },
            }}
            onClick={() => setOpenModal(true)}
          >
            Add Member
          </Button>
        </Box>

        <CreateMemberModal
          familyLoading={familyLoading}
          open={openModal}
          handleClose={() => setOpenModal(false)}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: { xs: 'center', sm: "start", md: 'start' },
            gap: 3,
          }}
        >
          {familyLoading ? (
            <Typography>Loading family members...</Typography>
          ) : familyMembers.length > 0 ? (
            familyMembers.map((member, i) => (
              <FamilyMemberCard  {...member} key={i} />
            ))
          ) : (
            <Typography color="text.secondary">
              No family members added yet.
            </Typography>
          )}
        </Box>

      </Box>

      {/* Features Section */}
      <Box sx={{ mt: 8, px: { xs: 3, sm: 10, md: 10 } }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={6}
          color="text.primary"
        >
          What You Can Do with HealthMate
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {features?.map((item, index) => (
            <FeatureCard {...item} key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
