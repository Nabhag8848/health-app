#!/bin/bash

set -euo pipefail

BASE_URL="http://localhost:3000/v1/clinic"
MAX_DOCTORS_PER_CLINIC=2
declare -a CLINICS=(
  "City Clinic|20.8453777|70.4795918|Sutrapada, Gir Somnath, Gujarat|14.3 km|-"
  "Community Health Center|20.8500000|70.4833330|Sutrapada, Gir Somnath, Gujarat|14.4 km|-"
  "Shivam Hospital|20.8440726|70.4818829|Sutrapada, Gir Somnath, Gujarat|14.6 km|-"
  "Avadh Clinic|20.8443599|70.4824712|Sutrapada, Gir Somnath, Gujarat|14.7 km|-"
  "Civil Hospital|20.8435400|70.4827369|Sutrapada, Gir Somnath, Gujarat|14.7 km|-"
  "Shree Medical|20.8424675|70.4826215|Sutrapada, Gir Somnath, Gujarat|14.8 km|-"
  "Shreenath Hospital|20.8393752|70.4801832|Sutrapada, Gir Somnath, Gujarat|14.8 km|-"
  "Wellcare Clinic|20.8398270|70.4817813|Sutrapada, Gir Somnath, Gujarat|14.9 km|-"
  "Om Clinic|20.8398091|70.4820423|Sutrapada, Gir Somnath, Gujarat|14.9 km|-"
  "Health Center|20.8378392|70.4822876|Sutrapada, Gir Somnath, Gujarat|15.1 km|-"
  "Aarav Clinic|20.9125441|70.3640000|Shahid chowk, 80 Feet Rd, Rayon Housing Society, Veraval, Gujarat 362265|350 m|4.4"
  "Birla Hospital|20.9144872|70.3679567|opp. Hanuman Temple, Rayon Housing Society, Jobanpura, Veraval, Gujarat 362265|700 m|3.8"
  "Barad Hospital|20.9121759|70.3731457|near Shubham Tower, opp. Saint Bus Stand Road, Veraval, Gujarat 362265|1 km|3.8"
  "Ekta Diagnostic|20.9063465|70.3740603|Near Lohana samaj boarding gate, opposite BUS STATION VERAVAL-362264, Veraval, Gujarat 362265|1.1 km|4.4"
  "Urocare Hospital|20.9014058|70.3702176|2nd Floor, Aditya arcade, opp. Rajdhani hotel, nr. New Doctor house, Rayon Housing Society, Veraval, Gujarat 362265|1.1 km|4.9"
  "Sparsh Clinic|20.8995186|70.3640000|2nd floor, New doctor house, St Bus Stand Rd, Rayon Housing Society, Veraval, Gujarat 362265|1.1 km|4.4"
  "Sanjivani Hospital|20.9014058|70.3577824|near Ambaji Mandir Road, Veraval, Gujarat 362265|1.1 km|3.9"
  "Sangani Hospital|20.9063465|70.3539397|Station Rd, opp. Kaveri Hospital, near Sagar Restaurant, Veraval, Gujarat 362265|1.1 km|-"
  "Sangani Medical|20.9124535|70.3539397|St Bus Stand Rd, opposite Kaveri hotel, Veraval, Gujarat 362265|1.1 km|4.0"
  "Krishna Hospital|20.9173942|70.3577824|opposite Saint Bus Stand Road, Veraval, Gujarat 362265|1.1 km|4.6"
)

DOCTOR_FIRST_NAMES=(
  "Aarav" "Priya" "Ishaan" "Kavya" "Rohan"
  "Anaya" "Dev" "Mira" "Kabir" "Nisha"
  "Vihaan" "Sara" "Arjun" "Riya" "Sahil"
  "Anjali" "Kiran" "Neel" "Pooja" "Vivek"
)

DOCTOR_LAST_NAMES=(
  "Patel" "Desai" "Mehta" "Sharma" "Kapoor"
  "Iyer" "Reddy" "Chopra" "Khan" "Joshi"
  "Kulkarni" "Basu" "Nair" "Singh" "Verma"
  "Ghosh" "Saxena" "Bhatia" "Malik" "Shah"
)

random_doctor_name() {
  local first=${DOCTOR_FIRST_NAMES[$RANDOM % ${#DOCTOR_FIRST_NAMES[@]}]}
  local last=${DOCTOR_LAST_NAMES[$RANDOM % ${#DOCTOR_LAST_NAMES[@]}]}
  echo "Dr. $first $last"
}

random_yoe() {
  echo $(( (RANDOM % 23) + 2 ))
}

create_doctor() {
  local clinic_id=$1
  local doctor_name
  doctor_name=$(random_doctor_name)
  local yoe
  yoe=$(random_yoe)

  curl -s -X POST "${BASE_URL}/${clinic_id}/doctor" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"${doctor_name}\", \"yoe\": ${yoe}}" | jq '.'
}

echo "=== Creating Clinics & Doctors ==="
echo ""

declare -a SUMMARY=()
index=1
for clinic in "${CLINICS[@]}"; do
  IFS='|' read -r name lat lng address distance rating <<<"$clinic"
  echo "Creating Clinic ${index}: ${name} (${lat}, ${lng})"
  if [[ -n "${address:-}" ]]; then
    echo "  ↳ Address: ${address}"
  fi
  if [[ -n "${distance:-}" || -n "${rating:-}" ]]; then
    echo "  ↳ Distance: ${distance:-N/A}, Rating: ${rating:-'-'}"
  fi

  response=$(curl -s -X POST "${BASE_URL}" \
    -H "Content-Type: application/json" \
    -d "{\"name\": \"${name}\", \"lng\": ${lng}, \"lat\": ${lat}}")

  echo "$response" | jq '.'
  clinic_id=$(echo "$response" | jq -r '.id')

  if [[ -z "$clinic_id" || "$clinic_id" == "null" ]]; then
    echo "✗ Failed to create clinic ${name}, skipping doctors."
    continue
  fi

  doctor_target=$(( (RANDOM % MAX_DOCTORS_PER_CLINIC) + 1 ))
  echo "→ Creating ${doctor_target} doctor(s) for ${name}"

  for ((doc=1; doc<=doctor_target; doc++)); do
    create_doctor "$clinic_id"
  done

  summary_meta=""
  if [[ -n "${address:-}" ]]; then
    summary_meta+="Address: ${address}"
  fi
  if [[ -n "${distance:-}" ]]; then
    summary_meta+="${summary_meta:+ | }Distance: ${distance}"
  fi
  if [[ -n "${rating:-}" ]]; then
    summary_meta+="${summary_meta:+ | }Rating: ${rating}"
  fi

  SUMMARY+=("${name} (${clinic_id}) — ${doctor_target} doctor(s)${summary_meta:+ | ${summary_meta}}")
  echo ""
  index=$((index + 1))
done

echo "=== Summary ==="
printf '%s\n' "${SUMMARY[@]}"

