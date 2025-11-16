#!/bin/bash

# Base URL - adjust port if needed
BASE_URL="http://localhost:3000/v1/clinic"

echo "=== Creating Clinics ==="
echo ""

# Create Clinic 1: San Francisco
echo "Creating Clinic 1: San Francisco Medical Center..."
CLINIC_1_RESPONSE=$(curl -s -X POST "${BASE_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "San Francisco Medical Center",
    "lng": -122.4194,
    "lat": 37.7749
  }')

echo "$CLINIC_1_RESPONSE" | jq '.'
CLINIC_1_ID=$(echo "$CLINIC_1_RESPONSE" | jq -r '.id')
echo "Clinic 1 ID: $CLINIC_1_ID"
echo "$CLINIC_1_ID" > /tmp/clinic_1_id.txt

echo ""
echo "---"
echo ""

# Create Clinic 2: Oakland
echo "Creating Clinic 2: Oakland Health Clinic..."
CLINIC_2_RESPONSE=$(curl -s -X POST "${BASE_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Oakland Health Clinic",
    "lng": -122.2711,
    "lat": 37.8044
  }')

echo "$CLINIC_2_RESPONSE" | jq '.'
CLINIC_2_ID=$(echo "$CLINIC_2_RESPONSE" | jq -r '.id')
echo "Clinic 2 ID: $CLINIC_2_ID"
echo "$CLINIC_2_ID" > /tmp/clinic_2_id.txt

echo ""
echo "---"
echo ""

# Create Clinic 3: San Jose
echo "Creating Clinic 3: San Jose Community Hospital..."
CLINIC_3_RESPONSE=$(curl -s -X POST "${BASE_URL}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "San Jose Community Hospital",
    "lng": -121.8863,
    "lat": 37.3382
  }')

echo "$CLINIC_3_RESPONSE" | jq '.'
CLINIC_3_ID=$(echo "$CLINIC_3_RESPONSE" | jq -r '.id')
echo "Clinic 3 ID: $CLINIC_3_ID"
echo "$CLINIC_3_ID" > /tmp/clinic_3_id.txt

echo ""
echo ""
echo "=== Creating Doctors ==="
echo ""

# Create doctors for Clinic 1 (San Francisco)
echo "Creating doctors for San Francisco Medical Center..."
DOCTOR_1_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_1_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. John Smith",
    "yoe": 15
  }')

echo "$DOCTOR_1_RESPONSE" | jq '.'
DOCTOR_1_ID=$(echo "$DOCTOR_1_RESPONSE" | jq -r '.id')
echo "$DOCTOR_1_ID" > /tmp/doctor_1_id.txt

DOCTOR_2_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_1_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Sarah Johnson",
    "yoe": 10
  }')

echo "$DOCTOR_2_RESPONSE" | jq '.'
DOCTOR_2_ID=$(echo "$DOCTOR_2_RESPONSE" | jq -r '.id')
echo "$DOCTOR_2_ID" > /tmp/doctor_2_id.txt

echo ""
echo "---"
echo ""

# Create doctors for Clinic 2 (Oakland)
echo "Creating doctors for Oakland Health Clinic..."
DOCTOR_3_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_2_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Michael Brown",
    "yoe": 20
  }')

echo "$DOCTOR_3_RESPONSE" | jq '.'
DOCTOR_3_ID=$(echo "$DOCTOR_3_RESPONSE" | jq -r '.id')
echo "$DOCTOR_3_ID" > /tmp/doctor_3_id.txt

DOCTOR_4_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_2_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Emily Davis",
    "yoe": 8
  }')

echo "$DOCTOR_4_RESPONSE" | jq '.'
DOCTOR_4_ID=$(echo "$DOCTOR_4_RESPONSE" | jq -r '.id')
echo "$DOCTOR_4_ID" > /tmp/doctor_4_id.txt

echo ""
echo "---"
echo ""

# Create doctors for Clinic 3 (San Jose)
echo "Creating doctors for San Jose Community Hospital..."
DOCTOR_5_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_3_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Robert Wilson",
    "yoe": 25
  }')

echo "$DOCTOR_5_RESPONSE" | jq '.'
DOCTOR_5_ID=$(echo "$DOCTOR_5_RESPONSE" | jq -r '.id')
echo "$DOCTOR_5_ID" > /tmp/doctor_5_id.txt

DOCTOR_6_RESPONSE=$(curl -s -X POST "${BASE_URL}/${CLINIC_3_ID}/doctor" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dr. Lisa Anderson",
    "yoe": 12
  }')

echo "$DOCTOR_6_RESPONSE" | jq '.'
DOCTOR_6_ID=$(echo "$DOCTOR_6_RESPONSE" | jq -r '.id')
echo "$DOCTOR_6_ID" > /tmp/doctor_6_id.txt

echo ""
echo ""
echo "=== Testing getWithinRange ==="
echo ""

# Test 1: Small radius from SF center (should find only SF clinic)
echo "Test 1: Small radius (5km) from San Francisco center..."
curl -X GET "${BASE_URL}/nearby?lng=-122.4194&lat=37.7749&radius=5" | jq '.'

echo ""
echo "---"
echo ""

# Test 2: Medium radius from SF center (should find SF and Oakland)
echo "Test 2: Medium radius (30km) from San Francisco center..."
curl -X GET "${BASE_URL}/nearby?lng=-122.4194&lat=37.7749&radius=30" | jq '.'

echo ""
echo "---"
echo ""

# Test 3: Large radius from SF center (should find all three)
echo "Test 3: Large radius (100km) from San Francisco center..."
curl -X GET "${BASE_URL}/nearby?lng=-122.4194&lat=37.7749&radius=100" | jq '.'

echo ""
echo "---"
echo ""

# Test 4: From Oakland (should find Oakland and SF)
echo "Test 4: Medium radius (25km) from Oakland center..."
curl -X GET "${BASE_URL}/nearby?lng=-122.2711&lat=37.8044&radius=25" | jq '.'

echo ""
echo "---"
echo ""

# Test 5: From a location far away (should find none)
echo "Test 5: Small radius (10km) from Los Angeles (should find none)..."
curl -X GET "${BASE_URL}/nearby?lng=-118.2437&lat=34.0522&radius=10" | jq '.'

echo ""
echo "---"
echo ""

# Test 6: From San Jose center (should find San Jose)
echo "Test 6: Small radius (10km) from San Jose center..."
curl -X GET "${BASE_URL}/nearby?lng=-121.8863&lat=37.3382&radius=10" | jq '.'

echo ""
echo ""
echo "=== Summary ==="
echo "Clinic IDs saved to:"
echo "  Clinic 1 (SF): $CLINIC_1_ID -> /tmp/clinic_1_id.txt"
echo "    - Doctor 1: $DOCTOR_1_ID (Dr. John Smith) -> /tmp/doctor_1_id.txt"
echo "    - Doctor 2: $DOCTOR_2_ID (Dr. Sarah Johnson) -> /tmp/doctor_2_id.txt"
echo "  Clinic 2 (Oakland): $CLINIC_2_ID -> /tmp/clinic_2_id.txt"
echo "    - Doctor 3: $DOCTOR_3_ID (Dr. Michael Brown) -> /tmp/doctor_3_id.txt"
echo "    - Doctor 4: $DOCTOR_4_ID (Dr. Emily Davis) -> /tmp/doctor_4_id.txt"
echo "  Clinic 3 (San Jose): $CLINIC_3_ID -> /tmp/clinic_3_id.txt"
echo "    - Doctor 5: $DOCTOR_5_ID (Dr. Robert Wilson) -> /tmp/doctor_5_id.txt"
echo "    - Doctor 6: $DOCTOR_6_ID (Dr. Lisa Anderson) -> /tmp/doctor_6_id.txt"
echo ""
echo "To delete these clinics and doctors, run: ./delete-clinic-api.sh"
echo ""
echo "Note: The getWithinRange endpoint should now return clinics with their associated doctors."

