#!/bin/bash

API_URL="http://localhost:5000/api"

echo "🧪 Testing Salt & Smoke API Endpoints"
echo "======================================"

echo -e "\n✅ 1. Health Check"
curl -s "$API_URL/health" | jq .

echo -e "\n✅ 2. Create Reservation"
RESERVATION=$(curl -s -X POST "$API_URL/reservations" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "date": "2024-12-25",
    "time": "19:30",
    "guests": 4,
    "requests": "Window seat"
  }')
echo "$RESERVATION" | jq .
RESERVATION_ID=$(echo "$RESERVATION" | jq -r '.reservationId')

echo -e "\n✅ 3. Get All Reservations"
curl -s "$API_URL/reservations" | jq .

echo -e "\n✅ 4. Get Specific Reservation (ID: $RESERVATION_ID)"
curl -s "$API_URL/reservations/$RESERVATION_ID" | jq .

echo -e "\n✅ 5. Newsletter Signup"
curl -s -X POST "$API_URL/newsletter/signup" \
  -H "Content-Type: application/json" \
  -d '{"email": "subscriber@example.com"}' | jq .

echo -e "\n✅ 6. Get Newsletter Signups"
curl -s "$API_URL/newsletter/signups" | jq .

echo -e "\n✅ 7. Create Menu Item"
MENU=$(curl -s -X POST "$API_URL/menu" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Smoked Brisket",
    "category": "lunch",
    "description": "Slow-smoked Texas-style brisket",
    "price": 24.99,
    "is_chefs_pick": true
  }')
echo "$MENU" | jq .
MENU_ID=$(echo "$MENU" | jq -r '.menuId')

echo -e "\n✅ 8. Create Another Menu Item"
curl -s -X POST "$API_URL/menu" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pulled Pork Sandwich",
    "category": "lunch",
    "description": "Tender pulled pork with BBQ sauce",
    "price": 15.99
  }' | jq .

echo -e "\n✅ 9. Get All Menu Items"
curl -s "$API_URL/menu" | jq .

echo -e "\n✅ 10. Filter Menu by Category (lunch)"
curl -s "$API_URL/menu?category=lunch" | jq .

echo -e "\n✅ 11. Get Specific Menu Item (ID: $MENU_ID)"
curl -s "$API_URL/menu/$MENU_ID" | jq .

echo -e "\n✅ 12. Update Menu Item"
curl -s -X PUT "$API_URL/menu/$MENU_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Premium Smoked Brisket",
    "category": "lunch",
    "description": "Updated description",
    "price": 26.99,
    "is_chefs_pick": false
  }' | jq .

echo -e "\n✅ 13. Test Validation - Invalid Email"
curl -s -X POST "$API_URL/reservations" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "invalid-email",
    "date": "2024-12-25",
    "time": "19:30",
    "guests": 4
  }' | jq .

echo -e "\n✅ 14. Test Validation - Invalid Guest Count"
curl -s -X POST "$API_URL/reservations" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "date": "2024-12-25",
    "time": "19:30",
    "guests": 50
  }' | jq .

echo -e "\n✅ 15. Delete Menu Item"
curl -s -X DELETE "$API_URL/menu/$MENU_ID" | jq .

echo -e "\n======================================"
echo "🎉 All API tests completed!"
