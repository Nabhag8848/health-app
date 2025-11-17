#!/bin/bash

# Base URL - adjust port if needed
BASE_URL="http://localhost:3000/v1/clinic"

echo "=== Creating Clinics ==="
echo ""

# Create Clinic 1: Aarav Clinic
echo "Creating Clinic 1: Aarav Clinic..."
CLINIC_1_RESPONSE=$(curl -s -X POST "${BASE_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Aarav Clinic",
    "lng": 70.3546,
    "lat": 20.9142
  }')

echo "$CLINIC_1_RESPONSE" | jq '.'
CLINIC_1_ID=$(echo "$CLINIC_1_RESPONSE" | jq -r '.id')
echo "Clinic 1 ID: $CLINIC_1_ID"
echo ""

# Create Clinic 2: Shivaay ENT & Women's Hospital
echo "Creating Clinic 2: Shivaay ENT & Women'\''s Hospital..."
CLINIC_2_RESPONSE=$(curl -s -X POST "${BASE_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Shivaay ENT & Women'\''s Hospital",
    "lng": 70.3618,
    "lat": 20.9157
  }')

echo "$CLINIC_2_RESPONSE" | jq '.'
CLINIC_2_ID=$(echo "$CLINIC_2_RESPONSE" | jq -r '.id')
echo "Clinic 2 ID: $CLINIC_2_ID"
echo ""

# Create Clinic 3: UROCARE KIDNEY & PROSTATE HOSPITAL
echo "Creating Clinic 3: UROCARE KIDNEY & PROSTATE HOSPITAL..."
CLINIC_3_RESPONSE=$(curl -s -X POST "${BASE_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "UROCARE KIDNEY & PROSTATE HOSPITAL",
    "lng": 70.3618,
    "lat": 20.9157
  }')

echo "$CLINIC_3_RESPONSE" | jq '.'
CLINIC_3_ID=$(echo "$CLINIC_3_RESPONSE" | jq -r '.id')
echo "Clinic 3 ID: $CLINIC_3_ID"
echo ""

echo ""
echo "=== Creating Doctors ==="
echo ""

# Create doctors for Clinic 1 (Aarav Clinic)
echo "Creating doctors for Aarav Clinic..."
DOCTOR_1_1_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_1_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Aarav Patel",
    "yoe": 12
  }')
echo "$DOCTOR_1_1_RESPONSE" | jq '.'

DOCTOR_1_2_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_1_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Priya Sharma",
    "yoe": 8
  }')
echo "$DOCTOR_1_2_RESPONSE" | jq '.'

DOCTOR_1_3_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_1_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Rajesh Kumar",
    "yoe": 15
  }')
echo "$DOCTOR_1_3_RESPONSE" | jq '.'
echo ""

# Create doctors for Clinic 2 (Shivaay ENT & Women's Hospital)
echo "Creating doctors for Shivaay ENT & Women'\''s Hospital..."
DOCTOR_2_1_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_2_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Anjali Mehta",
    "yoe": 10
  }')
echo "$DOCTOR_2_1_RESPONSE" | jq '.'

DOCTOR_2_2_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_2_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Vikram Singh",
    "yoe": 18
  }')
echo "$DOCTOR_2_2_RESPONSE" | jq '.'

DOCTOR_2_3_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_2_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Sneha Desai",
    "yoe": 7
  }')
echo "$DOCTOR_2_3_RESPONSE" | jq '.'
echo ""

# Create doctors for Clinic 3 (UROCARE KIDNEY & PROSTATE HOSPITAL)
echo "Creating doctors for UROCARE KIDNEY & PROSTATE HOSPITAL..."
DOCTOR_3_1_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_3_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Mohan Reddy",
    "yoe": 20
  }')
echo "$DOCTOR_3_1_RESPONSE" | jq '.'

DOCTOR_3_2_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_3_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Kavita Nair",
    "yoe": 14
  }')
echo "$DOCTOR_3_2_RESPONSE" | jq '.'

DOCTOR_3_3_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_3_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Amit Joshi",
    "yoe": 11
  }')
echo "$DOCTOR_3_3_RESPONSE" | jq '.'
echo ""

echo "=== Summary ==="
echo "Created 3 clinics with 3 doctors each (9 doctors total)"
echo "Clinic 1 (Aarav Clinic): $CLINIC_1_ID"
echo "Clinic 2 (Shivaay ENT & Women's Hospital): $CLINIC_2_ID"
echo "Clinic 3 (UROCARE KIDNEY & PROSTATE HOSPITAL): $CLINIC_3_ID"

