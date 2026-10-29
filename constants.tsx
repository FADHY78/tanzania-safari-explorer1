
import { TourPackage, Testimonial } from './types';

export const TOURS: TourPackage[] = [
  {
    "id": "kilimanjaro-lemosho-8-days",
    "name": "Kilimanjaro Lemosho Route Trekking",
    "category": "Trekking",
    "duration": "8 Days",
    "priceRange": "$3,001",
    "fromPrice": 3001,
    "rates": [
      {
        "pax": "1 Person",
        "price": 3001,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 2413,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 2333,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 2276,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/trekking-q6cddz690ts9x5xr22ez97y2b983qsmrgbyr3k3jq8.jpeg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg",
    "highlights": [
      "Scenic drive to Lemosho Gate",
      "Trek through lush rainforest to Mti Mkubwa",
      "Crossing the Shira Plateau",
      "Acclimatization at Lava Tower",
      "Climbing the Great Barranco Wall",
      "Summiting Uhuru Peak via Stella Point"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will be eagerly anticipating your arrival at the airport holding a sign with your name on it, ready to extend a warm and heartfelt welcome. From there, a seamless and comfortable transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival at the hotel, you will be served a delicious meal. Later on, our experienced mountain coordinators and your Guide will give you a pre-trekking briefing.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Springlands Hotel - Lemosho Park Gate - Mti Mkubwa Camp",
        "activities": "On the first day, after breakfast and a briefing from your guide at Springlands Hotel, you’ll be transferred to Lemosho Park Gate (2,100m), a 1.5-hour drive. At Londorossi Gate, you’ll complete the registration before starting your trek along scenic forest trails to Mti Mkubwa Campsite (2750m), a 3-hour hike. Upon arrival, the porters will set up the tents and our chef will prepare lunch. After enjoying your meal, you’ll have time to relax until dinner.",
        "accommodation": "Mti Mkubwa Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Mti Mkubwa Camp to Shira Camp 1",
        "activities": "On the second day, you’ll start early with breakfast before embarking on a short hike from Mti Mkubwa to Shira 1 Camp, which typically takes up to 5 hours. As you trek, you’ll be treated to views of the west face of Kibo Volcano. The trail traverses lower moonland, showcasing large shrubs and vibrant wildflowers. Upon arrival at Shira 1 Camp, our porters will set up your tents while our chef prepares lunch.",
        "accommodation": "Shira Camp 1",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Shira Camp 1 to Shira Camp 2",
        "activities": "On the third day, you will wake up early for breakfast and commence the brief hike from Shira 1 to Shira 2 camp. This usually takes no more than 5-6 hours. The trek is relatively easy, allowing you to relish breathtaking views of Africa. Upon reaching the Shira 2 campsite, our dedicated porters will take care of all the arrangements, such as pitching tents, while our chef prepares your lunch.",
        "accommodation": "Shira Camp 2",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Shira Camp 2 - Lava Tower - Barranco Camp",
        "activities": "Start the day with an early wake-up call and a hearty breakfast. Today’s route includes a climb to the Lava Tower at 4,630m, passing through a semi-desert, rocky landscape. After a 5-hour hike, enjoy lunch before ascending the rocky scree path to Lava Tower. After lunch, descend 680m to the Barranco campsite, where the true benefit of acclimatization becomes clear. The 2-hour descent offers stunning photo opportunities of the Western Breach.",
        "accommodation": "Barranco Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Barranco Camp to Karanga Camp",
        "activities": "Start your day early with a wake-up call and a nourishing breakfast. The journey may involve ascending the famous Barranco Wall, a steep but rewarding section. After conquering the Wall, you’ll descend into the scenic Karanga Valley. Upon reaching the Karanga campsite, the porters will set up tents while our chef prepares lunch. After your meal, you’ll embark on an acclimatization hike towards Barafu Camp, ascending 200 meters before returning to camp.",
        "accommodation": "Karanga Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Karanga Camp to Barafu Camp",
        "activities": "Start your day with an early wake-up call and a hearty breakfast. The trail features varied terrain, including rocky sections and gradual slopes, offering breathtaking views of Kilimanjaro’s high-altitude landscapes. Upon reaching Barafu, our porters will handle camp setup while the chef prepares lunch. In the evening, your guide will brief you on the upcoming summit attempt. Try to rest well, as the summit ascent begins late in the evening.",
        "accommodation": "Barafu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Barafu Camp - Summit - Mweka Camp",
        "activities": "You’ll rise around 11:30 PM and start the ascent after some tea and biscuits. Heading northwest, you’ll climb through scree towards Stella Point on the crater rim. From there, it’s a 2-hour snow-covered ascent to Uhuru Peak. After taking in the magnificent scenery, descend to Millennium Camp or Mweka Camp to rest for the night.",
        "accommodation": "Mweka Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 9,
        "title": "Mweka Camp - Mweka Park Gate - Springlands Hotel",
        "activities": "After breakfast at Mweka Camp, you’ll descend to Mweka Gate and be driven back to Springlands Hotel, where a hot lunch and refreshing shower awaits. At the end of the trip, tipping the team is encouraged. If you wish to extend your adventure with a safari, you can meet with our safari coordinator at the hotel.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 10,
        "title": "Departure",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure. If you wish to extend your adventure, you may choose to add a day trip to your itinerary or continue your journey with a visit to the stunning island of Zanzibar.",
        "accommodation": "None",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-machame-7-days",
    "name": "Kilimanjaro Machame Route Trekking",
    "category": "Trekking",
    "duration": "7 Days",
    "priceRange": "$2,584",
    "fromPrice": 2584,
    "rates": [
      {
        "pax": "1 Person",
        "price": 2584,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 2056,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 2023,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 1965,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/7-days-machame-q7uhx4dl11xrr3ao020xabzqzwvm9oxm4gn0ke87mo.jpg",
    "coverImage": "/images/tours/machame-route-cover.jpg",
    "highlights": [
      "Scenic Machame \"Whiskey\" Route",
      "Trek through rainforest and moorland",
      "Lava Tower for acclimatization",
      "Challenging Barranco Wall",
      "Summit Uhuru Peak",
      "Descent via Mweka Route"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will welcome you and transfer you to Springlands Hotel. Upon arrival at the hotel, you will be served a delicious meal. Later on, our experienced mountain coordinators and your Guide will give you a pre-trekking briefing.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Moshi to Machame Camp",
        "activities": "After breakfast and a briefing, you’ll embark on a 45-minute drive from Moshi to Machame Park Gate. The trek begins as you enter the lush rainforest. The trail to Machame Camp covers approximately 11 km and typically takes about 6 hours. In the evening, the porters will boil drinking and washing water, while the cook prepares your dinner.",
        "accommodation": "Machame Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Machame Camp to Shira Camp",
        "activities": "After breakfast at Machame Camp, you’ll start your trek towards Shira Camp. The hike covers a distance of approximately 5 km and takes around 4 to 5 hours. The trail begins with a steep ascent through the moorland zone, offering stunning views as you climb. Upon arrival at Shira Camp, our porters will set up the tents and prepare lunch.",
        "accommodation": "Shira Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Shira Camp to Lava Tower to Barranco Camp",
        "activities": "After breakfast, embark on a challenging trek to Lava Tower, reaching 4,630 meters. The 11 km hike takes 7 to 8 hours. Enjoy lunch with panoramic views at Lava Tower before descending to Barranco Camp at 3,960 meters. The descent offers stunning vistas of the Western Breach.",
        "accommodation": "Barranco Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Barranco Camp - Karanga Camp",
        "activities": "Start your day early. The journey may involve ascending the famous Barranco Wall. After conquering the Wall, you’ll descend into the scenic Karanga Valley. Upon reaching the Karanga campsite, the porters will set up tents while our chef prepares lunch. After your meal, you’ll embark on an acclimatization hike towards Barafu Camp, ascending 200 meters before returning to camp.",
        "accommodation": "Karanga Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Karanga Camp - Barafu Camp",
        "activities": "Start your day with an early wake-up call and a hearty breakfast to fuel your trek toward Barafu campsite. The trail features varied terrain. Upon reaching Barafu, our porters will handle camp setup. In the evening, your guide will brief you on the upcoming summit attempt. Try to rest well.",
        "accommodation": "Barafu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Barafu Camp - Summit - Mweka Camp",
        "activities": "You’ll rise around 11:30 PM and start the ascent. Heading northwest, you’ll climb through scree towards Stella Point (5685m). From there, it’s a 2-hour snow-covered ascent to Uhuru Peak. After taking in the magnificent scenery, descend to Barafu for a short rest before continuing to Mweka Camp for dinner and overnight.",
        "accommodation": "Mweka Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Mweka Camp - Mweka Park Gate - Springlands Hotel",
        "activities": "After breakfast at Mweka Camp, you’ll descend to Mweka Gate and be driven back to Springlands Hotel, where a hot lunch and refreshing shower awaits. At the end of the trip, tipping the team is encouraged.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 9,
        "title": "Departure",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure. Alternatively, you can continue your journey with a visit to Zanzibar or a safari.",
        "accommodation": "None",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-marangu-6-days",
    "name": "Kilimanjaro Marangu Route Trekking",
    "category": "Trekking",
    "duration": "6 Days",
    "priceRange": "$2,306",
    "fromPrice": 2306,
    "rates": [
      {
        "pax": "1 Person",
        "price": 2306,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 1822,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 1704,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 1647,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/marangu-6-days1-q7up38u1t7ag04cuqmqp072nn4ma1fo0y216xvi6xs.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg",
    "highlights": [
      "Older \"Coca-Cola\" Route",
      "Comfortable A-frame hut accommodation",
      "Maundi Crater scenic views",
      "Saddle between Kibo and Mawenzi",
      "Gilman's Point on the crater rim",
      "Uhuru Peak summit"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, hut accommodation fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Hut accommodations with beds and solar lighting (Mandara, Horombo, Kibo)",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will be eagerly anticipating your arrival at the airport. From there, a seamless and comfortable transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival at the hotel, you will be served a delicious meal. Later on, our experienced mountain coordinators will give you a pre-trekking briefing.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Moshi to Marangu Gate | Mandara Hut",
        "activities": "After breakfast, you’ll set off from Moshi for a 1-hour drive to the Marangu Gate. At the gate, you’ll complete the necessary registration formalities before beginning your trek through the verdant rainforest. The trail to Mandara Hut involves a steady uphill hike. Upon arrival, you’ll be greeted with a warm meal and stay in comfortable A-frame huts.",
        "accommodation": "Mandara Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Mandara Hut to Horombo Hut",
        "activities": "Begin your day with a hearty breakfast at Mandara Hut before continuing your trek through the lush rainforest and transitioning into the moorland zone. The 6-hour trek to Horombo Hut offers stunning views of Kibo and Mawenzi peaks. Upon arrival at Horombo, you’ll be greeted with a warm meal.",
        "accommodation": "Horombo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Acclimatization Day at Horombo Hut",
        "activities": "To assist with acclimatization, you’ll spend an extra day at Horombo Hut. During this day, you have the option to rest at the camp or embark on a short acclimatization hike to Zebra Rocks, a striking geological feature located at 3,980 meters above sea level.",
        "accommodation": "Horombo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Horombo Hut to Kibo Hut",
        "activities": "Today’s trek takes you across the expansive lunar desert known as the \"Saddle,\" a barren and rugged landscape that stretches between Kibo and Mawenzi peaks. The hike will take approximately 6 hours. Upon arriving at Kibo Hut, you’ll settle in for an early dinner and rest, conserving your energy for the upcoming summit attempt.",
        "accommodation": "Kibo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Kibo Hut | Summit Attempt | Horombo Hut",
        "activities": "Around midnight, you’ll be awakened to begin the final ascent toward Uhuru Peak. The journey to Gillman’s Point (5,685m) is steep and strenuous. Once you reach Gillman’s Point, you’ll traverse the crater rim toward Uhuru Peak, the highest point in Africa. After celebrating at the summit, you’ll descend to Kibo Hut for a short rest before continuing to Horombo Hut.",
        "accommodation": "Horombo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Horombo Hut to Marangu Gate | Return to Moshi",
        "activities": "After breakfast, you’ll start your descent through the diverse moorland and lush rainforest zones, making your way back to Marangu Gate. Upon reaching the gate, you’ll be presented with your summit certificate. From there, you’ll be driven back to Springlands Hotel in Moshi, where a hot meal and comfortable bed await.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Departure Day",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure. If you wish to extend your adventure, you may choose to add a day trip or continue to Zanzibar.",
        "accommodation": "None",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-rongai-7-days",
    "name": "Kilimanjaro Rongai Route Trekking",
    "category": "Trekking",
    "duration": "7 Days",
    "priceRange": "$2,584",
    "fromPrice": 2584,
    "rates": [
      {
        "pax": "1 Person",
        "price": 2584,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 2125,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 2046,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 1988,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/rongai-7-days-q7urww3qv8fpi2pk72hb51o485m7f472l5qg82sk2o.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg",
    "highlights": [
      "Northern slope approach near Kenya border",
      "High success rate route",
      "Camping at Mawenzi Tarn",
      "Crossing the Saddle",
      "Descent via Marangu route",
      "Less crowded wilderness experience"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will welcome you. From there, a seamless transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival, you will be served a delicious meal. Later, your Guide will give you a pre-trekking briefing.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Moshi to Rongai Gate | Simba Camp",
        "activities": "After breakfast, you’ll set off on a 2 to 3-hour drive toward the Rongai Gate. Upon arriving at the gate, you’ll complete the registration process before beginning your trek through lush farmlands and pine forests. Once you arrive at Simba Camp, you’ll enjoy a hot meal and settle in for the night.",
        "accommodation": "Simba Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Simba Camp to Kikelewa Camp",
        "activities": "Ascend steadily to the Second Cave for lunch. From there, continue across the moorland on a smaller path toward Mawenzi’s jagged peaks. After about 10 km, you’ll reach Kikelewa Camp, situated in a sheltered valley surrounded by giant Senecios.",
        "accommodation": "Kikelewa Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Kikelewa Camp to Mawenzi Tarn Hut",
        "activities": "Today’s trek is shorter but steeper, taking you through grassy slopes that lead to the stunning Mawenzi Tarn, nestled beneath the towering cliffs of Mawenzi Peak. The campsite is set in a dramatic, picturesque landscape with breathtaking views.",
        "accommodation": "Mawenzi Tarn Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Acclimatization Day at Mawenzi Tarn",
        "activities": "This extra day at Mawenzi Tarn is essential for acclimatization. Use this time to hike up toward Mawenzi Peak, which provides a splendid acclimatization opportunity. After your hike, return to Mawenzi Tarn to rest and relax.",
        "accommodation": "Mawenzi Tarn Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Mawenzi Tarn Hut to Kibo Hut",
        "activities": "After breakfast, you’ll embark on a trek across the vast, barren lunar landscape known as the \"Saddle,\" which stretches between Mawenzi and Kibo peaks. Upon arriving at Kibo Hut, you’ll rest and enjoy an early dinner to conserve energy for the summit attempt. Your guide will provide a detailed briefing.",
        "accommodation": "Kibo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Kibo Hut | Summit Attempt | Horombo Hut",
        "activities": "Around midnight, you’ll be awakened to begin the final ascent toward Uhuru Peak. The journey to Gillman’s Point (5,685m) is steep and strenuous. Once you reach Gillman’s Point, you’ll traverse the crater rim toward Uhuru Peak. After celebrating, you’ll descend to Kibo Hut for a short rest before continuing onward to Horombo Hut.",
        "accommodation": "Horombo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Horombo Hut to Marangu Gate | Return to Moshi",
        "activities": "After breakfast, you’ll start your descent through the diverse moorland and lush rainforest zones, making your way back to Marangu Gate. Upon reaching the gate, you’ll be presented with your summit certificate. From there, you’ll be driven back to Springlands Hotel in Moshi.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 9,
        "title": "Departure Day",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure.",
        "accommodation": "None",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-umbwe-6-days",
    "name": "Kilimanjaro Umbwe Route Trekking",
    "category": "Trekking",
    "duration": "6 Days",
    "priceRange": "$2,325",
    "fromPrice": 2325,
    "rates": [
      {
        "pax": "1 Person",
        "price": 2325,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 1769,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 1735,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 1678,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Kilimanjaro-Umbwe-Route-6-q7utkom5luac13ux1wwyqyhokiwr1zke53od7q509s.jpeg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg",
    "highlights": [
      "Steepest and most challenging route",
      "Spectacular ridge views",
      "Great Barranco Wall climb",
      "Rapid ascent profile",
      "Quiet and uncrowded trail",
      "Uhuru Peak summit"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will be eagerly anticipating your arrival. From there, a seamless transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival, you will be served a delicious meal. Later on, your Guide will give you a pre-trekking briefing.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Moshi to Umbwe Gate | Umbwe Camp",
        "activities": "After breakfast, you will be transferred to the Umbwe Gate to start your trek. The path through dense rainforest is steep and demanding. As you gradually ascend, you’ll witness rich vegetation. Upon reaching Umbwe Camp, you can enjoy a hot lunch prepared by our chef. Settle in for the night at the camp.",
        "accommodation": "Umbwe Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Umbwe Camp to Barranco Camp",
        "activities": "Start your day with an early breakfast before embarking on a challenging hike to Barranco Camp. This section of the trek features steep ascents and descents as you navigate through the rugged Barranco Valley. The camp, situated with breathtaking views of the Barranco Wall, provides an ideal spot for acclimatization.",
        "accommodation": "Barranco Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Barranco Camp | Karanga Camp",
        "activities": "Start your day early. The journey may involve ascending the famous Barranco Wall, a steep but rewarding section. After conquering the Wall, you’ll descend into the scenic Karanga Valley. Upon reaching the Karanga campsite, the porters will set up tents while our chef prepares lunch. After your meal, you’ll embark on an acclimatization hike towards Barafu Camp.",
        "accommodation": "Karanga Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Karanga Camp | Barafu Camp",
        "activities": "Start your day with an early wake-up call and a hearty breakfast to fuel your trek toward Barafu campsite. The trail features varied terrain, including rocky sections and gradual slopes. Upon reaching Barafu, our porters will handle camp setup. In the evening, your guide will brief you on the upcoming summit attempt.",
        "accommodation": "Barafu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Barafu Camp | Summit | Mweka Camp",
        "activities": "You’ll rise around 11:30 PM and start the ascent. Heading northwest, you’ll climb through scree towards Stella Point (5685m). From there, it’s a 2-hour snow-covered ascent to Uhuru Peak. After taking in the magnificent scenery, descend to Barafu for a short rest before continuing to Mweka Camp for dinner and overnight.",
        "accommodation": "Mweka Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Mweka Camp | Mweka Park Gate | Springlands Hotel",
        "activities": "After breakfast at Mweka Camp, you’ll descend to Mweka Gate and be driven back to Springlands Hotel, where a hot lunch and refreshing shower awaits. At the end of the trip, tipping the team is encouraged.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Departure Day",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure.",
        "accommodation": "None",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-shira-7-days",
    "name": "Kilimanjaro Shira Route Trekking",
    "category": "Trekking",
    "duration": "7 Days",
    "priceRange": "$2,662",
    "fromPrice": 2662,
    "rates": [
      {
        "pax": "1 Person",
        "price": 2662,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 2413,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 2333,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 2251,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Londrossi-Gate-rh9062wybbmw7bwvey0zyf18w2hz2eb0vr07hmmjkw.jpeg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg",
    "highlights": [
      "Scenic drive to Londorossi Gate",
      "Trek across the Shira Plateau",
      "Acclimatization at Lava Tower",
      "Climbing the Great Barranco Wall",
      "Summiting Uhuru Peak via Stella Point"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will be eagerly anticipating your arrival at the airport holding a sign with your name on it, ready to extend a warm and heartfelt welcome. From there, a seamless and comfortable transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival at the hotel, you will be served a delicious meal. Later on, our experienced mountain coordinators and your Guide will give you a pre-trekking briefing, an exciting opportunity to learn about the wonders that await you in your upcoming expedition.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Moshi to Londorossi Gate to Shira 1 Camp",
        "activities": "On this day, after breakfast and receiving essential instructions from your guide at Springlands Hotel, you’ll be driven to Londorossi Park Gate (2250m), a 1.5-hour drive. Following the guide’s advice is crucial to avoid altitude sickness as you will be climbing to significant elevations, with your first night at Shira 1 Camp. At Londorossi Gate, you’ll briefly complete registration before entering the national park. Next, you’ll have a short drive along Shira Road to the Moram Picnic Site, about 45 minutes. From there, you’ll begin the 7 km hike to Shira 1 Camp, typically taking 3 to 4 hours depending on your pace. You’ll rest overnight at Shira 1, preparing for the next day’s trek to Shira 2 Camp.",
        "accommodation": "Shira 1 Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Shira 1 Camp to Shira 2 Camp",
        "activities": "On this day, you will wake up early for breakfast and commence the brief hike from Shira 1 to Shira 2 camp. This usually takes no more than 5-6 hours. The trek is relatively easy, allowing you to relish breathtaking views of Africa. Upon reaching the Shira 2 campsite, our dedicated porters will take care of all the arrangements, such as pitching tents, while our chef prepares your lunch. After enjoying your meal, you will have a chance to unwind and rest until dinnertime. In the evening, following dinner, our experienced guide will brief you about the trekking plans for the next day.",
        "accommodation": "Shira 2 Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Shira 2 Camp to Lava Tower to Barranco Camp",
        "activities": "Start the day with an early wake-up call and a hearty breakfast to fuel your trek. Today’s route includes a climb to the Lava Tower at 4,630m, passing through a semi-desert, rocky landscape. After a 5-hour hike, enjoy lunch before ascending the rocky scree path to Lava Tower. This demanding day might test your endurance as you adjust to the higher altitude. After lunch, descend 680m to the Barranco campsite, where the true benefit of acclimatization becomes clear. The 2-hour descent offers stunning photo opportunities of the Western Breach. End the day with a memorable sunset and dinner at Barranco camp.",
        "accommodation": "Barranco Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Barranco Camp to Karanga Camp",
        "activities": "Start your day early with a wake-up call and a nourishing breakfast to fuel your trek. The journey may involve ascending the famous Barranco Wall, a steep but rewarding section. After conquering the Wall, you’ll descend into the scenic Karanga Valley, known for its lush vegetation and breathtaking landscapes. Upon reaching the Karanga campsite, the porters will set up tents while our chef prepares lunch. After your meal, you’ll embark on an acclimatization hike towards Barafu Camp, ascending 200 meters before returning to camp. In the evening, enjoy a hot meal prepared by the chef. Following dinner, your experienced guide will brief you on the next day’s trek, discussing the route, challenges, and key details.",
        "accommodation": "Karanga Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Karanga Camp to Barafu Camp",
        "activities": "Start your day with an early wake-up call and a hearty breakfast to fuel your trek toward Barafu campsite. The trail features varied terrain, including rocky sections and gradual slopes, offering breathtaking views of Kilimanjaro’s high-altitude landscapes. As you ascend, focus on acclimatization to avoid altitude-related issues. Upon reaching Barafu, our porters will handle camp setup while the chef prepares lunch. After eating, rest until dinner. In the evening, your guide will brief you on the upcoming summit attempt, covering the route, challenges, safety measures, and preparations. Try to rest well, as the summit ascent begins late in the evening.",
        "accommodation": "Barafu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Barafu Camp to Summit to Mweka Camp",
        "activities": "You’ll rise around 11:30 PM and start the ascent after some tea and biscuits. Heading northwest, you’ll climb through scree towards Stella Point on the crater rim. The 6-hour trek to Stella Point (5685m) is often the most mentally and physically challenging part of the climb. After a brief rest at Stella Point, you’ll be rewarded with a magnificent sunrise, weather permitting. From there, it’s a 2-hour snow-covered ascent to Uhuru Peak. Your time at the summit will depend on the weather, so don’t linger too long due to the cold and fatigue. The descent to Barafu takes about 3 hours for a short rest before continuing to Mweka Camp for dinner and overnight.",
        "accommodation": "Mweka Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Mweka Camp to Mweka Gate",
        "activities": "After breakfast at Mweka Camp, you’ll descend to Mweka Gate and be driven back to Springlands Hotel, where a hot lunch and refreshing shower awaits. At the end of the trip, tipping the team is encouraged and appreciated; special envelopes for this purpose are available at the hotel. If you wish to extend your adventure with a safari, you can meet with our safari coordinator at the hotel. After some rest, the coordinator will provide a briefing on the various safari options available. We highly recommend booking a safari with us to experience Tanzania’s stunning wildlife and natural beauty, making your journey truly unforgettable.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch"
      },
      {
        "day": 9,
        "title": "Departure",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure. If you wish to extend your adventure, you may choose to add a day trip to your itinerary, exploring nearby attractions or immersing yourself in local culture. For more details, we invite you to visit our Day Trip page. Alternatively, you can continue your journey with a visit to the stunning island of Zanzibar. Whether you’re seeking relaxation on pristine beaches or delving into the island’s rich culture, Zanzibar offers something for everyone. Explore our Zanzibar page to discover the perfect package for your next excursion. If you’re interested in adding a safari experience, please visit our Safari page for more information on our exciting safari options.",
        "accommodation": "N/A",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-machame-6-days",
    "name": "Kilimanjaro Machame Route Trekking (6 Days)",
    "category": "Trekking",
    "duration": "6 Days",
    "priceRange": "$2,247",
    "fromPrice": 2247,
    "rates": [
      {
        "pax": "1 Person",
        "price": 2247,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 1769,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 1735,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 1678,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/safari-to-kilimanjaro-q6cetewb0g758z80pau0p8o4kbp6yitz6x5aintz8g.jpeg",
    "coverImage": "/images/tours/machame-route-cover.jpg",
    "highlights": [
      "Known as the \"Whiskey Route\"",
      "Scenic climb through rainforest and moorland",
      "Acclimatization via Lava Tower",
      "Climbing the Barranco Wall",
      "Challenging 6-day itinerary"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will be eagerly anticipating your arrival at the airport holding a sign with your name on it, ready to extend a warm and heartfelt welcome. From there, a seamless and comfortable transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival at the hotel, you will be served a delicious meal. Later on, our experienced mountain coordinators and your Guide will give you a pre-trekking briefing, an exciting opportunity to learn about the wonders that await you in your upcoming expedition.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Moshi to Machame Camp",
        "activities": "After breakfast and a briefing at your hotel, you’ll embark on a 45-minute drive from Moshi to Machame Park Gate. Upon arrival, you’ll complete the registration process and receive your lunch pack. The trek begins as you enter the lush rainforest, where you may encounter muddy and slippery conditions if it has rained. The trail to Machame Camp covers approximately 11 km and typically takes about 6 hours to complete. In the evening, the porters will boil drinking and washing water, while the cook prepares your dinner. With temperatures potentially dropping to freezing, you’ll retire to your tent for a chilly but rewarding night.",
        "accommodation": "Machame Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Machame Camp to Shira Camp",
        "activities": "After breakfast at Machame Camp, you’ll start your trek towards Shira Camp. The hike covers a distance of approximately 5 km and takes around 4 to 5 hours. The trail begins with a steep ascent through the moorland zone, offering stunning views as you climb. As you approach Shira Camp, you’ll be walking along a ridge with breathtaking vistas of the surrounding landscape. Upon arrival at Shira Camp, our porters will set up the tents and prepare lunch. You’ll have time to relax and acclimate before dinner. In the evening, your guide will brief you on the plans for the next day’s trek.",
        "accommodation": "Shira Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Shira Camp to Lava Tower to Barranco Camp",
        "activities": "After breakfast at Shira Camp, you’ll embark on a challenging trek to Lava Tower, reaching 4,630 meters. The 11 km hike takes 7 to 8 hours and features rocky, semi-desert terrain. Enjoy lunch with panoramic views at Lava Tower before descending to Barranco Camp at 3,960 meters. The descent, lasting about 2 hours, offers stunning vistas of the Western Breach. Upon arrival at Barranco Camp, the team will set up your tents and prepare dinner. Your guide will brief you on the next day’s trek in the evening, preparing you for the adventures ahead.",
        "accommodation": "Barranco Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Barranco Camp to Barafu Camp",
        "activities": "After an early breakfast, you’ll begin the day by tackling the famous Barranco Wall, a steep yet rewarding climb that offers incredible views. Once at the top, you’ll descend into the lush Karanga Valley, where you’ll have lunch at the Karanga Camp. After a short rest, you’ll continue your trek toward Barafu Camp, climbing through varied terrain and stunning landscapes. Upon arrival at Barafu, the porters will set up camp while you rest and enjoy dinner prepared by our chef. In the evening, your guide will brief you on the upcoming summit attempt. Rest well, as the final ascent starts later in the night.",
        "accommodation": "Barafu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Barafu Camp to Summit to Mweka Camp",
        "activities": "You’ll rise around 11:30 PM and start the ascent after some tea and biscuits. Heading northwest, you’ll climb through scree towards Stella Point on the crater rim. The 6-hour trek to Stella Point (5685m) is often the most mentally and physically challenging part of the climb. After a brief rest at Stella Point, you’ll be rewarded with a magnificent sunrise, weather permitting. From there, it’s a 2-hour snow-covered ascent to Uhuru Peak. Your time at the summit will depend on the weather, so don’t linger too long due to the cold and fatigue. The descent to Barafu takes about 3 hours for a short rest before continuing to Mweka Camp for dinner and overnight.",
        "accommodation": "Mweka Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Mweka Camp to Mweka Gate",
        "activities": "After breakfast at Mweka Camp, you’ll descend to Mweka Gate and be driven back to Springlands Hotel, where a hot lunch and refreshing shower awaits. At the end of the trip, tipping the team is encouraged and appreciated; special envelopes for this purpose are available at the hotel. If you wish to extend your adventure with a safari, you can meet with our safari coordinator at the hotel. After some rest, the coordinator will provide a briefing on the various safari options available. We highly recommend booking a safari with us to experience Tanzania’s stunning wildlife and natural beauty, making your journey truly unforgettable.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch"
      },
      {
        "day": 8,
        "title": "Departure",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure. If you wish to extend your adventure, you may choose to add a day trip to your itinerary, exploring nearby attractions or immersing yourself in local culture. For more details, we invite you to visit our Day Trip page. Alternatively, you can continue your journey with a visit to the stunning island of Zanzibar. Whether you’re seeking relaxation on pristine beaches or delving into the island’s rich culture, Zanzibar offers something for everyone. Explore our Zanzibar page to discover the perfect package for your next excursion. If you’re interested in adding a safari experience, please visit our Safari page for more information on our exciting safari options.",
        "accommodation": "N/A",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-marangu-5-days",
    "name": "Kilimanjaro Marangu Route Trekking (5 Days)",
    "category": "Trekking",
    "duration": "5 Days",
    "priceRange": "$1,937",
    "fromPrice": 1937,
    "rates": [
      {
        "pax": "1 Person",
        "price": 1937,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 1822,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 1686,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 1428,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/marangu-route-q7undhtqu0rbac1wbfu0pa1iquz7d9iu4f5uyh29pc.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg",
    "highlights": [
      "Only route with hut accommodation",
      "Shortest and most established route",
      "Scenic rainforest and moorland",
      "Views of Mawenzi and Kibo peaks",
      "Known as the \"Coca-Cola Route\""
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, hut accommodation fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Hut accommodations with beds and solar lighting (Mandara, Horombo, Kibo)",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will be eagerly anticipating your arrival at the airport holding a sign with your name on it, ready to extend a warm and heartfelt welcome. From there, a seamless and comfortable transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival at the hotel, you will be served a delicious meal. Later on, our experienced mountain coordinators and your Guide will give you a pre-trekking briefing, an exciting opportunity to learn about the wonders that await you in your upcoming expedition.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Moshi to Marangu Gate | Mandara Hut",
        "activities": "After breakfast, you’ll set off from Moshi for a 1-hour drive to the Marangu Gate. At the gate, you’ll complete the necessary registration formalities before beginning your trek through the verdant rainforest. The trail to Mandara Hut, your first camp, involves a steady uphill hike, where you might spot monkeys and other wildlife. Upon arrival at Mandara, you’ll be greeted with a warm meal and stay in comfortable A-frame huts. In the evening, you have the option to take a short acclimatization hike to Maundi Crater, offering stunning panoramic views of the surrounding landscape.",
        "accommodation": "Mandara Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Mandara Hut to Horombo Hut",
        "activities": "Begin your day with a hearty breakfast at Mandara Hut before continuing your trek through the lush rainforest and transitioning into the moorland zone. As you ascend, the vegetation gradually changes, giving way to a more rugged and open landscape. The 6-hour trek to Horombo Hut offers stunning views of Kibo and Mawenzi peaks along the way. Upon arrival at Horombo, you’ll be greeted with a warm meal and the opportunity to relax and acclimate to the higher altitude. In the evening, your guide will provide a briefing for the next day’s trek, ensuring you are well-prepared for the challenges ahead.",
        "accommodation": "Horombo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Horombo Hut to Kibo Hut",
        "activities": "Today’s trek takes you across the expansive lunar desert known as the “Saddle,” a barren and rugged landscape that stretches between Kibo and Mawenzi peaks. Although the terrain is stark and desolate, the views of the towering peaks on either side are truly awe-inspiring. The hike will take approximately 6 hours, giving you ample time to take in the vastness of the landscape. Upon arriving at Kibo Hut, you’ll settle in for an early dinner and rest, conserving your energy for the upcoming summit attempt. In the evening, your guide will provide a detailed briefing to prepare you for the final ascent, which will begin just before midnight.",
        "accommodation": "Kibo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Kibo Hut | Summit Attempt | Horombo Hut",
        "activities": "Around midnight, you’ll be awakened to begin the final ascent toward Uhuru Peak. The journey to Gillman’s Point, at 5,685 meters, is steep and strenuous, typically taking around six hours of steady climbing. This challenging section will test your endurance, but your guide will offer support along the way. Once you reach Gillman’s Point, you’ll traverse the crater rim toward Uhuru Peak, the highest point in Africa. If the weather cooperates, you’ll be rewarded with a breathtaking sunrise over the continent. After celebrating your incredible achievement at the summit, you’ll descend to Kibo Hut for a short rest before continuing onward to Horombo Hut for the night.",
        "accommodation": "Horombo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Horombo Hut to Marangu Gate | Return to Moshi",
        "activities": "After breakfast, you’ll start your descent through the diverse moorland and lush rainforest zones, making your way back to Marangu Gate. As you trek downward, take in the final views of the landscape and reflect on your accomplishment. Upon reaching the gate, you’ll be presented with your well-earned summit certificate as a testament to your achievement. From there, you’ll be driven back to Springlands Hotel in Moshi, where a hot meal, a refreshing shower, and a comfortable bed await. If you’re interested in extending your adventure, you can meet with our safari coordinator to explore options like a thrilling wildlife safari or a relaxing trip to the stunning beaches of Zanzibar.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch"
      },
      {
        "day": 7,
        "title": "Departure",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure. If you wish to extend your adventure, you may choose to add a day trip to your itinerary, exploring nearby attractions or immersing yourself in local culture. For more details, we invite you to visit our Day Trip page. Alternatively, you can continue your journey with a visit to the stunning island of Zanzibar. Whether you’re seeking relaxation on pristine beaches or delving into the island’s rich culture, Zanzibar offers something for everyone. Explore our Zanzibar page to discover the perfect package for your next excursion. If you’re interested in adding a safari experience, please visit our Safari page for more information on our exciting safari options.",
        "accommodation": "N/A",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-rongai-6-days",
    "name": "Kilimanjaro Rongai Route Trekking (6 Days)",
    "category": "Trekking",
    "duration": "6 Days",
    "priceRange": "$2,325",
    "fromPrice": 2325,
    "rates": [
      {
        "pax": "1 Person",
        "price": 2325,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 1838,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 1758,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 1701,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/RONGAI-ROUTE-q7uqo8rq8jbe0vkawrp9pb9wf9ojsoy2g665kwzrmo.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg",
    "highlights": [
      "Approaches from the north",
      "Less crowded wilderness route",
      "High chance of seeing wildlife",
      "Scenic camp at Mawenzi Tarn",
      "Descent via Marangu route"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will be eagerly anticipating your arrival at the airport holding a sign with your name on it, ready to extend a warm and heartfelt welcome. From there, a seamless and comfortable transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival at the hotel, you will be served a delicious meal. Later on, our experienced mountain coordinators and your Guide will give you a pre-trekking briefing, an exciting opportunity to learn about the wonders that await you in your upcoming expedition.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Moshi to Rongai Gate | Simba Camp",
        "activities": "After breakfast at the hotel, you’ll set off on a 2 to 3-hour drive toward the Rongai Gate, passing through scenic farmlands and rural villages. Upon arriving at the gate, you’ll complete the registration process before beginning your trek through lush farmlands and pine forests. The trail starts with a gentle ascent, allowing you to gradually adjust to the altitude. Along the way, you might spot wildlife such as colobus monkeys. The peaceful surroundings offer a great introduction to Kilimanjaro’s diverse landscapes. Once you arrive at Simba Camp, you’ll enjoy a hot meal and settle in for the night, resting up for the days ahead.",
        "accommodation": "Simba Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Simba Camp to Kikelewa Camp",
        "activities": "After an early breakfast, you’ll set off on your trek, ascending through the beautiful moorland zone. As you climb higher, the landscape opens up, offering stunning views of the eastern ice fields along Kilimanjaro’s crater rim. The trail becomes steeper as you approach Kikelewa Camp, where you’ll be greeted with breathtaking panoramic views of the surrounding landscapes. Upon arrival at the camp, you’ll enjoy a hot, freshly prepared meal, and settle in for a well-deserved rest, soaking in the serenity of the high-altitude environment as you prepare for the next stage of your adventure.",
        "accommodation": "Kikelewa Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Kikelewa Camp to Mawenzi Tarn Hut",
        "activities": "Today’s trek is shorter but steeper, taking you through grassy slopes that lead to the stunning Mawenzi Tarn, nestled beneath the towering cliffs of Mawenzi Peak. The campsite is set in a dramatic, picturesque landscape with breathtaking views in every direction. Upon arrival, you’ll enjoy a hot lunch and have time to relax or take a short acclimatization hike to help your body adjust to the altitude. In the evening, you’ll be served dinner, followed by an informative briefing from your guide to prepare you for the next day’s trek to higher altitudes.",
        "accommodation": "Mawenzi Tarn Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Mawenzi Tarn Hut to Kibo Hut",
        "activities": "After breakfast, you’ll embark on a trek across the vast, barren lunar landscape known as the \"Saddle,\" which stretches between Mawenzi and Kibo peaks. The hike offers incredible views of the semi-desert terrain, with the summit of Kibo looming in the distance. When you arrive at Kibo Hut, you’ll settle into camp and rest. Dinner will be served early to allow you to get some sleep before your midnight wake-up call for the final ascent to the summit. Your guide will provide a detailed briefing on what to expect during the summit attempt.",
        "accommodation": "Kibo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Kibo Hut | Summit Attempt | Horombo Hut",
        "activities": "Around midnight, you’ll be awakened to begin the final ascent toward Uhuru Peak. The journey to Gillman’s Point, at 5,685 meters, is steep and strenuous, typically taking around six hours of steady climbing. This challenging section will test your endurance, but your guide will offer support along the way. Once you reach Gillman’s Point, you’ll traverse the crater rim toward Uhuru Peak, the highest point in Africa. If the weather cooperates, you’ll be rewarded with a breathtaking sunrise over the continent. After celebrating your incredible achievement at the summit, you’ll descend to Kibo Hut for a short rest before continuing onward to Horombo Hut for the night.",
        "accommodation": "Horombo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Horombo Hut to Marangu Gate | Return to Moshi",
        "activities": "After breakfast, you’ll start your descent through the diverse moorland and lush rainforest zones, making your way back to Marangu Gate. As you trek downward, take in the final views of the landscape and reflect on your accomplishment. Upon reaching the gate, you’ll be presented with your well-earned summit certificate as a testament to your achievement. From there, you’ll be driven back to Springlands Hotel in Moshi, where a hot meal, a refreshing shower, and a comfortable bed await. If you’re interested in extending your adventure, you can meet with our safari coordinator to explore options like a thrilling wildlife safari or a relaxing trip to the stunning beaches of Zanzibar.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Departure",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure. If you wish to extend your adventure, you may choose to add a day trip to your itinerary, exploring nearby attractions or immersing yourself in local culture. For more details, we invite you to visit our Day Trip page. Alternatively, you can continue your journey with a visit to the stunning island of Zanzibar. Whether you’re seeking relaxation on pristine beaches or delving into the island’s rich culture, Zanzibar offers something for everyone. Explore our Zanzibar page to discover the perfect package for your next excursion. If you’re interested in adding a safari experience, please visit our Safari page for more information on our exciting safari options.",
        "accommodation": "N/A",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-lemosho-7-days",
    "name": "Kilimanjaro Lemosho Route Trekking (7 Days)",
    "category": "Trekking",
    "duration": "7 Days",
    "priceRange": "$2,584",
    "fromPrice": 2584,
    "rates": [
      {
        "pax": "1 Person",
        "price": 2584,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 2125,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 2046,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 1988,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Lemosho-Hiking-kilimajaro-climb-qu8sutmciqoioii2vyiflva3p689oa7o49v1aj8hpc.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg",
    "highlights": [
      "Scenic drive to Lemosho Gate",
      "Trek through lush rainforest to Mti Mkubwa",
      "Crossing the Shira Plateau",
      "Acclimatization at Lava Tower",
      "Climbing the Great Barranco Wall",
      "Summiting Uhuru Peak via Stella Point"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will be eagerly anticipating your arrival at the airport holding a sign with your name on it, ready to extend a warm and heartfelt welcome. From there, a seamless and comfortable transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival at the hotel, you will be served a delicious meal. Later on, our experienced mountain coordinators and your Guide will give you a pre-trekking briefing, an exciting opportunity to learn about the wonders that await you in your upcoming expedition.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Springlands Hotel - Lemosho Park Gate - Mti Mkubwa Camp",
        "activities": "On the first day, after breakfast and a briefing from your guide at Springlands Hotel, you’ll be transferred to Lemosho Park Gate ( 2,100m), a 1.5-hour drive. At Londorossi Gate, you’ll complete the registration before starting your trek along scenic forest trails to Mti Mkubwa Campsite (2750m), a 3-hour hike. Upon arrival, the porters will set up the tents and our chef will prepare lunch. After enjoying your meal, you’ll have time to relax until dinner. In the evening, your guide will provide a briefing about the next day’s trek.",
        "accommodation": "Mti Mkubwa Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Mti Mkubwa Camp to Shira Camp 2",
        "activities": "On the second day, you’ll start early with breakfast before embarking on a short hike from Mti Mkubwa to Shira 1 Camp, which typically takes up to 5 hours. As you trek, you’ll be treated to views of the west face of Kibo Volcano, often referred to as Kilimanjaro. The trail traverses lower moonland, showcasing large shrubs and vibrant wildflowers. Upon arrival at Shira 1 Camp, our porters will set up your tents while our chef prepares lunch. After your meal, you’ll have time to relax until dinner. In the evening, your guide will provide a briefing on the plans for the following day’s trek.",
        "accommodation": "Shira Camp 2",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Shira Camp 2 | Lava Tower | Barranco Camp",
        "activities": "Start the day with an early wake-up call and a hearty breakfast to fuel your trek. Today’s route includes a climb to the Lava Tower at 4,630m, passing through a semi-desert, rocky landscape. After a 5-hour hike, enjoy lunch before ascending the rocky scree path to Lava Tower. This demanding day might test your endurance as you adjust to the higher altitude. After lunch, descend 680m to the Barranco campsite, where the true benefit of acclimatization becomes clear. The 2-hour descent offers stunning photo opportunities of the Western Breach. End the day with a memorable sunset and dinner at Barranco camp.",
        "accommodation": "Barranco Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Barranco Camp | Karanga Camp",
        "activities": "Start your day early with a wake-up call and a nourishing breakfast to fuel your trek. The journey may involve ascending the famous Barranco Wall, a steep but rewarding section. After conquering the Wall, you’ll descend into the scenic Karanga Valley, known for its lush vegetation and breathtaking landscapes. Upon reaching the Karanga campsite, the porters will set up tents while our chef prepares lunch. After your meal, you’ll embark on an acclimatization hike towards Barafu Camp, ascending 200 meters before returning to camp. In the evening, enjoy a hot meal prepared by the chef. Following dinner, your experienced guide will brief you on the next day’s trek, discussing the route, challenges, and key details.",
        "accommodation": "Karanga Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Karanga Camp | Barafu Camp",
        "activities": "Start your day with an early wake-up call and a hearty breakfast to fuel your trek toward Barafu campsite. The trail features varied terrain, including rocky sections and gradual slopes, offering breathtaking views of Kilimanjaro’s high-altitude landscapes. As you ascend, focus on acclimatization to avoid altitude-related issues. Upon reaching Barafu, our porters will handle camp setup while the chef prepares lunch. After eating, rest until dinner. In the evening, your guide will brief you on the upcoming summit attempt, covering the route, challenges, safety measures, and preparations. Try to rest well, as the summit ascent begins late in the evening.",
        "accommodation": "Barafu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Barafu Camp | Summit | Mweka Camp",
        "activities": "You’ll rise around 11:30 PM and start the ascent after some tea and biscuits. Heading northwest, you’ll climb through scree towards Stella Point on the crater rim. The 6-hour trek to Stella Point (5685m) is often the most mentally and physically challenging part of the climb. After a brief rest at Stella Point, you’ll be rewarded with a magnificent sunrise, weather permitting. From there, it’s a 2-hour snow-covered ascent to Uhuru Peak. Your time at the summit will depend on the weather, so don’t linger too long due to the cold and fatigue. The descent to Barafu takes about 3 hours for a short rest before continuing to Mweka Camp for dinner and overnight.",
        "accommodation": "Mweka Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Mweka Camp | Mweka Park Gate | Springlands Hotel",
        "activities": "After breakfast at Mweka Camp, you’ll descend to Mweka Gate and be driven back to Springlands Hotel, where a hot lunch and refreshing shower awaits. At the end of the trip, tipping the team is encouraged and appreciated; special envelopes for this purpose are available at the hotel. If you wish to extend your adventure with a safari, you can meet with our safari coordinator at the hotel. After some rest, the coordinator will provide a briefing on the various safari options available. We highly recommend booking a safari with us to experience Tanzania’s stunning wildlife and natural beauty, making your journey truly unforgettable.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch"
      },
      {
        "day": 9,
        "title": "Departure",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure. If you wish to extend your adventure, you may choose to add a day trip to your itinerary, exploring nearby attractions or immersing yourself in local culture. For more details, we invite you to visit our Day Trip page. Alternatively, you can continue your journey with a visit to the stunning island of Zanzibar. Whether you’re seeking relaxation on pristine beaches or delving into the island’s rich culture, Zanzibar offers something for everyone. Explore our Zanzibar page to discover the perfect package for your next excursion. If you’re interested in adding a safari experience, please visit our Safari page for more information on our exciting safari options.",
        "accommodation": "N/A",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-northern-circuit-9-days",
    "name": "Kilimanjaro Northern Circuit Route Trekking (9 Days)",
    "category": "Trekking",
    "duration": "9 Days",
    "priceRange": "$3,104",
    "fromPrice": 3104,
    "rates": [
      {
        "pax": "1 Person",
        "price": 3104,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 2695,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 2695,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 2695,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/Kilimanjaro-Northern-Circuit-Route1-q7uq22qr26yy7xrhcor0eenk34xx9nxyegax4zv0dc.jpeg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg",
    "highlights": [
      "Newest and longest route on Kilimanjaro",
      "Best acclimatization profile",
      "360-degree scenery of the mountain",
      "Quiet and secluded northern slopes",
      "High success rate",
      "Uhuru Peak summit"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will be eagerly anticipating your arrival at the airport holding a sign with your name on it, ready to extend a warm and heartfelt welcome. From there, a seamless and comfortable transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival at the hotel, you will be served a delicious meal. Later on, our experienced mountain coordinators and your Guide will give you a pre-trekking briefing, an exciting opportunity to learn about the wonders that await you in your upcoming expedition.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Springlands Hotel - Lemosho Park Gate - Mti Mkubwa Camp",
        "activities": "On the first day, after breakfast and a briefing from your guide at Springlands Hotel, you’ll be transferred to Lemosho Park Gate ( 2,100m), a 1.5-hour drive. At Londorossi Gate, you’ll complete the registration before starting your trek along scenic forest trails to Mti Mkubwa Campsite (2750m), a 3-hour hike. Upon arrival, the porters will set up the tents and our chef will prepare lunch. After enjoying your meal, you’ll have time to relax until dinner. In the evening, your guide will provide a briefing about the next day’s trek.",
        "accommodation": "Mti Mkubwa Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Mti Mkubwa Camp to Shira Camp 2",
        "activities": "Begin your day with an early breakfast before setting out on your trek from Mti Mkubwa Camp. The trail will lead you through diverse landscapes, including moorlands and stunning views of Kibo Volcano. You will hike for approximately 5 hours, reaching Shira Camp 1 for a hot lunch prepared by our chef. After your meal, continue the trek to Shira Camp 2, a further 2–3 hours away. Shira Camp 2 is located at a higher altitude, offering expansive views of the surrounding landscapes. Upon arrival, our porters will set up your tents, and you’ll have time to relax and acclimate before dinner. In the evening, your guide will brief you on the following day’s trek.",
        "accommodation": "Shira Camp 2",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Shira 2 Camp | Moir Hut",
        "activities": "Begin your trek with an early breakfast at Shira 2 Camp, then set out towards Moir Hut. As you start, the trail gradually steepens, leading you into the giant heather moorland zone and crossing Shira Ridge. The route offers breathtaking views of the surrounding landscapes, enhancing your journey. By early afternoon, you’ll arrive at Moir Hut (4,200 m), where you can take some time to relax and acclimate. This section of the trek features a combination of gentle ascents and spectacular vistas, helping to prepare you for the more challenging days ahead. The peaceful environment at Moir Hut allows you to recharge for the journey to come.",
        "accommodation": "Moir Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Moir Hut | Pofu Camp",
        "activities": "Start your trek with breakfast at Moir Hut, then proceed out of the moorland and into the alpine desert. Ascend a steep ridge off the main trail, a climb that will take about 5 to 7 hours to reach Pofu Camp (4,025 m). As you trek, enjoy the magnificent views of Kenya’s wild lands to the north. This challenging section of the journey offers a dramatic contrast to the lush moorland previously experienced, highlighting the stark beauty and vast expanse of the alpine desert. Arriving at Pofu Camp, you’ll have the opportunity to take in these breathtaking landscapes and prepare for the next stages of your adventure.",
        "accommodation": "Pofu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Pofu Camp | Third Caves Camp",
        "activities": "Begin your trek from Pofu Camp with a hearty breakfast, then continue eastward through valleys and ridges in the alpine desert and moorland. This trek, which takes approximately 5 to 7 hours, rewards you with expansive views of the vast mountain wilderness. As you progress, the rugged terrain and panoramic vistas offer a dramatic backdrop to your journey. Upon arrival at Third Caves Camp (3,600 m), you’ll have ample time to rest and acclimate, soaking in the serene surroundings. Enjoy the tranquil atmosphere as you prepare for the next day’s adventure, and savor a well-deserved dinner amidst the stunning landscapes.",
        "accommodation": "Third Caves Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Third Caves Camp to Mawenzi Tarn Camp",
        "activities": "Trek steadily upward to Mawenzi Tarn Camp, situated at an altitude of 4,315 meters, nestled at the base of the steep and dramatic ridges of Mawenzi, Kilimanjaro’s second highest peak. This segment of the trek takes you through rugged terrain, and as you climb, the landscape becomes increasingly majestic. Upon arrival at Mawenzi Tarn Camp, you’ll be greeted by breathtaking views of the surrounding peaks and the tranquil tarn that adds to the camp’s serene atmosphere. The peaceful setting provides a perfect backdrop for relaxation and acclimatization, allowing you to fully appreciate the grandeur of your surroundings and prepare for the next leg of your journey.",
        "accommodation": "Mawenzi Tarn Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Mawenzi Tarn Hut to Kibo Hut",
        "activities": "After breakfast, you’ll embark on a trek across the vast, barren lunar landscape known as the “Saddle,” which stretches between Mawenzi and Kibo peaks. The terrain is desolate yet mesmerizing, with rugged vistas and the summit looming ahead in the distance. Though the trail is long, it maintains a gentle incline, allowing for a steady pace as you approach the final stage of your journey. Upon arriving at Kibo Hut, you’ll rest and enjoy an early dinner to conserve energy for the summit attempt. Your guide will provide a detailed briefing, as the ascent to Uhuru Peak begins shortly after midnight.",
        "accommodation": "Kibo Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 9,
        "title": "Kibo Camp | Uhuru Peak | Millennium Camp",
        "activities": "Wake up around midnight to start your summit trek. Begin hiking at 1 am, navigating switchbacks and loose rock as you ascend to Gillman’s Point (5,685 m). From there, continue to Uhuru Peak (5,895 m), where you can enjoy breathtaking views and spend a brief time at the summit. After taking in the magnificent scenery, descend to Millennium Camp (3,110 m) to rest for the night. The challenging climb to the summit and subsequent descent will be both physically demanding and rewarding, making the evening’s rest at Millennium Camp a well-deserved reprieve.",
        "accommodation": "Millennium Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 10,
        "title": "Millennium Camp | Mweka Gate",
        "activities": "Descend from Millennium Camp (3,110 m) to Mweka Gate (1,830 m) in approximately 2 to 3 hours. Once at the gate, you’ll receive your climbing certificate to commemorate your achievement. Afterward, you’ll be transferred back to Springlands Hotel for your overnight stay. Enjoy a relaxing evening at the hotel, reflecting on your incredible journey and the accomplishment of your climb. If you have booked a safari, our safari coordinator will meet with you in the afternoon to provide a pre-briefing and discuss your upcoming adventure.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 11,
        "title": "Departure Day",
        "activities": "After breakfast, you’ll be transferred back to Kilimanjaro International Airport for your departure. If you wish to extend your adventure, you may choose to add a day trip to your itinerary, exploring nearby attractions or immersing yourself in local culture. For more details, we invite you to visit our Day Trip page. Alternatively, you can continue your journey with a visit to the stunning island of Zanzibar. Whether you’re seeking relaxation on pristine beaches or delving into the island’s rich culture, Zanzibar offers something for everyone. Explore our Zanzibar page to discover the perfect package for your next excursion. If you’re interested in adding a safari experience, please visit our Safari page for more information on our exciting safari options.",
        "accommodation": "None",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-machame-luxury-7-days",
    "name": "Kilimanjaro Machame Route Luxury Climb",
    "category": "Trekking",
    "duration": "7 Days",
    "priceRange": "$5,429",
    "fromPrice": 5429,
    "rates": [
      {
        "pax": "1 Person",
        "price": 5429,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 4312,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 4246,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 4130,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/machame-luxury-rb78vyxh9rskw9nkluctbnyf7xxgiiukdlb2ymaug0.jpg",
    "coverImage": "/images/tours/machame-route-cover.jpg",
    "highlights": [
      "Luxury accommodation before and after climb",
      "Upgraded camping equipment (large tents, private toilet)",
      "Scenic Machame Route",
      "Acclimatization via Lava Tower",
      "Premium meals and service"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks",
      "Luxury walk-in tents with raised cot beds and warm duvets",
      "Solar power charging station for cameras and phones"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "Upon your arrival at Kilimanjaro International Airport, our attentive driver will be waiting to greet you, holding a sign with your name, and will extend a warm and welcoming reception. From there, you’ll experience a smooth and comfortable transfer to the Hotel. Upon arrival at the hotel, you’ll be treated to a delicious meal to help you relax and refresh after your journey. Later, our experienced mountain coordinators and guides will meet with you for an informative pre-trek briefing, offering an exciting glimpse into the incredible adventure ahead. Immerse yourself in the serene ambiance of the Hotel, featuring a beautiful garden, a relaxing swimming pool, a bar, and a restaurant, creating the perfect environment for unwinding before your expedition begins.",
        "accommodation": "Gran Melia Arusha or Similar",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Moshi to Machame Camp",
        "activities": "After enjoying breakfast and a briefing at your hotel, you’ll set off on a 45-minute journey from Moshi to the Machame Park Gate. Upon arrival, the registration process will be completed, and you’ll receive your packed lunch. The adventure begins with your ascent through the vibrant rainforest, where the path may become muddy and slick if there has been recent rainfall. The trek to Machame Camp spans roughly 11 kilometers and usually takes around six hours. In the evening, porters will prepare hot water for drinking and washing, while the cook will serve up dinner. As night falls, temperatures may drop close to freezing, so you’ll settle into your tent for a cold but fulfilling night’s rest.",
        "accommodation": "Machame Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Machame Camp to Shira Camp",
        "activities": "After enjoying breakfast at Machame Camp, you’ll set off towards Shira Camp, covering about 5 kilometers in a journey that typically takes 4 to 5 hours. The trail begins with a steep ascent through the scenic moorland zone, where you’ll be treated to breathtaking views as you climb. As you near Shira Camp, you’ll walk along a ridge offering spectacular vistas of the surrounding landscape. Upon arrival, the porters will set up your tents and prepare lunch for you. You’ll have the afternoon to relax and acclimate to the altitude before dinner, followed by a briefing from your guide on the next day’s trek.",
        "accommodation": "Shira Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Shira Camp to Lava Tower to Barranco Camp",
        "activities": "After breakfast at Shira Camp, you’ll set off on a demanding trek to Lava Tower, ascending to an altitude of 4,630 meters. This hike spans approximately 11 kilometers and typically takes around 7 to 8 hours, featuring rocky, semi-desert terrain. Along the way, take in the panoramic views during your lunch stop at Lava Tower. Afterward, you’ll descend to Barranco Camp, situated at 3,960 meters. This descent lasts about 2 hours and offers stunning vistas of the Western Breach. Upon reaching Barranco Camp, the team will set up your tents and prepare dinner for you. In the evening, your guide will provide a briefing about the next day’s trek, ensuring you’re well-prepared for the adventures that lie ahead.",
        "accommodation": "Barranco Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Barranco Camp | Karanga Camp",
        "activities": "Start your day early with a wake-up call, followed by a hearty breakfast to energize you for the trek ahead. You may encounter the renowned Barranco Wall, a steep ascent that offers a rewarding challenge. Once you’ve conquered the Wall, you’ll make your way down into the picturesque Karanga Valley, celebrated for its lush greenery and stunning views. Upon arrival at the Karanga campsite, the porters will set up your tents while our chef prepares a delicious lunch. After your meal, you’ll undertake an acclimatization hike toward Barafu Camp, gaining an elevation of 200 meters before returning to your campsite. In the evening, savor a warm dinner crafted by our chef. Following your meal, your knowledgeable guide will provide a briefing on the next day’s trek, outlining the route, anticipated challenges, and essential details to help you prepare.",
        "accommodation": "Karanga Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Karanga Camp | Barafu Camp",
        "activities": "Begin your day with an early wake-up call and a substantial breakfast to prepare for your trek to Barafu campsite. The trail presents diverse terrain, featuring rocky patches and gentle inclines, all while showcasing stunning views of Kilimanjaro’s high-altitude scenery. As you ascend, prioritize acclimatization to prevent altitude sickness. Upon your arrival at Barafu, our porters will take care of setting up the camp while the chef prepares a nourishing lunch. After your meal, take some time to relax until dinner. In the evening, your guide will provide a detailed briefing regarding the forthcoming summit attempt, discussing the route, potential challenges, safety protocols, and necessary preparations. Be sure to rest well, as the summit ascent is scheduled to begin late in the evening.",
        "accommodation": "Barafu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Barafu Camp | Summit | Mweka Camp",
        "activities": "You’ll begin your ascent around 11:30 PM, starting with some tea and biscuits to fuel your energy. As you head northwest, you’ll navigate through scree on your way to Stella Point on the crater rim. This 6-hour trek to Stella Point (5,685 meters) is often considered the most mentally and physically demanding section of the climb. Once you reach Stella Point, take a moment to enjoy the breathtaking sunrise, conditions permitting. From there, you’ll continue on a snow-covered path for an additional 2-hour climb to Uhuru Peak. Be mindful of your time at the summit, as weather conditions may dictate the duration of your stay. It’s essential not to linger too long due to the cold and the fatigue you’ll experience. The descent to Barafu takes approximately 3 hours, where you’ll have a brief rest before continuing to Mweka Camp for dinner and your overnight stay.",
        "accommodation": "Mweka Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Mweka Camp | Mweka Park Gate | Springlands Hotel",
        "activities": "After enjoying breakfast at Mweka Camp, you’ll begin your descent to Mweka Gate, where a vehicle will be waiting to take you back to the hotel. There, you’ll be greeted with a hot lunch and a refreshing shower, the perfect way to unwind after your trek. After your journey, tipping the team is encouraged and appreciated; special envelopes for this purpose will be available at the hotel. If you’re interested in extending your adventure with a safari, you can meet with our safari coordinator at the hotel. After a short break to relax, the coordinator will provide a briefing on the various Tanzania safari options available. We highly recommend booking a safari with us to fully experience Tanzania’s breathtaking wildlife and natural beauty, ensuring your journey is truly unforgettable.",
        "accommodation": "Gran Melia Arusha or Similar",
        "meals": "Breakfast, Lunch"
      },
      {
        "day": 9,
        "title": "Departure Day",
        "activities": "After breakfast, you will be transferred back to Kilimanjaro International Airport for your departure. If you’re looking to extend your adventure, consider adding a day trip to your itinerary, allowing you to explore nearby attractions or immerse yourself in local culture. For further details, please check our Day Trip page. Alternatively, you can continue your journey by visiting the stunning island of Zanzibar. Whether you’re seeking relaxation on pristine beaches or diving into the island’s rich cultural heritage, Zanzibar has something for everyone. Explore our Zanzibar Holiday page to discover the perfect package for your next trip. If you’re interested in adding a safari experience, please visit our Safari page for more information on our exciting safari options.",
        "accommodation": "None",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "kilimanjaro-northern-circuit-8-days",
    "name": "Kilimanjaro Northern Circuit Route Trekking (8 Days)",
    "category": "Trekking",
    "duration": "8 Days",
    "priceRange": "$2,845",
    "fromPrice": 2845,
    "rates": [
      {
        "pax": "1 Person",
        "price": 2845,
        "currency": "$"
      },
      {
        "pax": "2-5 Persons",
        "price": 2387,
        "currency": "$"
      },
      {
        "pax": "6-10 Persons",
        "price": 2307,
        "currency": "$"
      },
      {
        "pax": "11+ Persons",
        "price": 2251,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/KILIMANJARO-NORTHEN-ROOT-q7y87h14x1stw34ps8brqwg6myz3o9z2ga3m1oabvk.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Mount-kilimanjaro.jpg",
    "highlights": [
      "Newest and longest route on Kilimanjaro",
      "Best acclimatization profile",
      "360-degree scenery of the mountain",
      "Quiet and secluded northern slopes",
      "High success rate",
      "Uhuru Peak summit"
    ],
    "included": [
      "Kilimanjaro International Airport pick-up and drop-off transfers",
      "2 Nights accommodation at Springlands Hotel in Moshi (double/triple occupancy, with breakfast & dinner)",
      "All Kilimanjaro National Park entrance fees, camping fees, and rescue fees",
      "Professional licensed mountain guides, assistant guides, porters, and cook",
      "All meals on the mountain (Breakfast, Lunch, Dinner prepared fresh by mountain cook)",
      "Four-season mountain tents, foam sleeping mattresses, and mess dining tent",
      "Portable private toilet tent on the mountain",
      "Safe treated and boiled drinking water throughout the trek",
      "Emergency oxygen cylinder and pulse oximeter for daily health checks"
    ],
    "notIncluded": [
      "International airfares and Tanzania tourist entry visa",
      "Travel, medical, and high-altitude evacuation insurance",
      "Tips and gratuities for mountain crew (guides, porters, and cook)",
      "Personal trekking gear and apparel (sleeping bags, poles, warm wear - available for rent at Springlands Hotel)",
      "Personal expenses, souvenirs, and laundry",
      "Alcoholic drinks and soft drinks at Springlands Hotel",
      "Single room supplement at Springlands Hotel (if requested)"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival",
        "activities": "As you arrive at Kilimanjaro International Airport, our dedicated driver will be eagerly anticipating your arrival at the airport holding a sign with your name on it, ready to extend a warm and heartfelt welcome. From there, a seamless and comfortable transfer service will whisk you away to our enchanting Springlands Hotel. Upon arrival at the hotel, you will be served a delicious meal. Later on, our experienced mountain coordinators and your Guide will give you a pre-trekking briefing, an exciting opportunity to learn about the wonders that await you in your upcoming expedition.",
        "accommodation": "Springlands Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Springlands Hotel - Lemosho Park Gate - Mti Mkubwa Camp",
        "activities": "On the first day, after breakfast and a briefing from your guide at Springlands Hotel, you’ll be transferred to Lemosho Park Gate ( 2,100m), a 1.5-hour drive. At Londorossi Gate, you’ll complete the registration before starting your trek along scenic forest trails to Mti Mkubwa Campsite (2750m), a 3-hour hike. Upon arrival, the porters will set up the tents and our chef will prepare lunch. After enjoying your meal, you’ll have time to relax until dinner. In the evening, your guide will provide a briefing about the next day’s trek.",
        "accommodation": "Mti Mkubwa Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Mti Mkubwa Camp to Shira Camp 2",
        "activities": "Begin your day with an early breakfast before setting out on your trek from Mti Mkubwa Camp. The trail will lead you through diverse landscapes, including moorlands and stunning views of Kibo Volcano. You will hike for approximately 5 hours, reaching Shira Camp 1 for a hot lunch prepared by our chef. After your meal, continue the trek to Shira Camp 2, a further 2–3 hours away. Shira Camp 2 is located at a higher altitude, offering expansive views of the surrounding landscapes. Upon arrival, our porters will set up your tents, and you’ll have time to relax and acclimate before dinner. In the evening, your guide will brief you on the following day’s trek.",
        "accommodation": "Shira Camp 2",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Shira 2 Camp | Moir Hut",
        "activities": "Begin your trek with an early breakfast at Shira 2 Camp, then set out towards Moir Hut. As you start, the trail gradually steepens, leading you into the giant heather moorland zone and crossing Shira Ridge. The route offers breathtaking views of the surrounding landscapes, enhancing your journey. By early afternoon, you’ll arrive at Moir Hut (4,200 m), where you can take some time to relax and acclimate. This section of the trek features a combination of gentle ascents and spectacular vistas, helping to prepare you for the more challenging days ahead. The peaceful environment at Moir Hut allows you to recharge for the journey to come.",
        "accommodation": "Moir Hut",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Moir Hut | Pofu Camp",
        "activities": "Start your trek with breakfast at Moir Hut, then proceed out of the moorland and into the alpine desert. Ascend a steep ridge off the main trail, a climb that will take about 5 to 7 hours to reach Pofu Camp (4,025 m). As you trek, enjoy the magnificent views of Kenya’s wild lands to the north. This challenging section of the journey offers a dramatic contrast to the lush moorland previously experienced, highlighting the stark beauty and vast expanse of the alpine desert. Arriving at Pofu Camp, you’ll have the opportunity to take in these breathtaking landscapes and prepare for the next stages of your adventure.",
        "accommodation": "Pofu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Pofu Camp | Third Caves Camp",
        "activities": "Begin your trek from Pofu Camp with a hearty breakfast, then continue eastward through valleys and ridges in the alpine desert and moorland. This trek, which takes approximately 5 to 7 hours, rewards you with expansive views of the vast mountain wilderness. As you progress, the rugged terrain and panoramic vistas offer a dramatic backdrop to your journey. Upon arrival at Third Caves Camp (3,600 m), you’ll have ample time to rest and acclimate, soaking in the serene surroundings. Enjoy the tranquil atmosphere as you prepare for the next day’s adventure, and savor a well-deserved dinner amidst the stunning landscapes.",
        "accommodation": "Third Caves Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 7,
        "title": "Third Caves Camp | Kibo Camp",
        "activities": "Begin your trek from Third Caves Camp, heading south through valleys and ridges onto the alpine desert and moorland. After trekking for approximately 4 to 6 hours, you’ll arrive at Kibo Camp (4,700 m), where temperatures will start to drop significantly. Use this time to prepare your gear for the upcoming summit attempt and take advantage of the fresh food supplies that will arrive in the afternoon. Enjoy a hearty meal and take an early night’s sleep, ensuring you are well-rested and ready for the challenging ascent to come. The rest at Kibo Camp is crucial for your energy and acclimatization before the summit bid.",
        "accommodation": "Kibo Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 8,
        "title": "Kibo Camp | Uhuru Peak | Millennium Camp",
        "activities": "Wake up around midnight to start your summit trek. Begin hiking at 1 am, navigating switchbacks and loose rock as you ascend to Gillman’s Point (5,685 m). From there, continue to Uhuru Peak (5,895 m), where you can enjoy breathtaking views and spend a brief time at the summit. After taking in the magnificent scenery, descend to Millennium Camp (3,110 m) to rest for the night. The challenging climb to the summit and subsequent descent will be both physically demanding and rewarding, making the evening’s rest at Millennium Camp a well-deserved reprieve.",
        "accommodation": "Millennium Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 9,
        "title": "Millennium Camp | Mweka Gate",
        "activities": "Descend from Millennium Camp (3,110 m) to Mweka Gate (1,830 m) in approximately 2 to 3 hours. Once at the gate, you’ll receive your climbing certificate to commemorate your achievement. Afterward, you’ll be transferred back to Springlands Hotel for your overnight stay. Enjoy a relaxing evening at the hotel, reflecting on your incredible journey and the accomplishment of your climb. If you have booked a safari, our safari coordinator will meet with you in the afternoon to provide a pre-briefing and discuss your upcoming adventure.",
        "accommodation": "Springlands Hotel",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 10,
        "title": "Departure Day",
        "activities": "Descend from Millennium Camp (3,110 m) to Mweka Gate (1,830 m) in approximately 2 to 3 hours. Once at the gate, you’ll receive your climbing certificate to commemorate your achievement. Afterward, you’ll be transferred back to Springlands Hotel for your overnight stay. Enjoy a relaxing evening at the hotel, reflecting on your incredible journey and the accomplishment of your climb. If you have booked a safari, our safari coordinator will meet with you in the afternoon to provide a pre-briefing and discuss your upcoming adventure. For more details about the safari options, please visit our Safari page.",
        "accommodation": "None",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "forest-tour-walk",
    "name": "Forest Tour Walk (5-Min Walk from Springlands)",
    "category": "Day Trips",
    "duration": "1 Day (2-3 Hours)",
    "priceRange": "$25",
    "fromPrice": 25,
    "badge": "Eco Walk",
    "rates": [
      {
        "pax": "1 Person",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "2-5 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "6-10 Persons",
        "price": 20,
        "currency": "USD"
      },
      {
        "pax": "11+ Persons",
        "price": 15,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/forest-walk-dt-qs0ck6gyg3inmjr9vvpcmo19by5n64929quz3ozujg.jpg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MATERUNI-DT.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/forest-walk-dt-qs0ck6gyg3inmjr9vvpcmo19by5n64929quz3ozujg.jpg",
    "highlights": [
      "Gentle walking safari just 5 minutes from Springlands Hotel in Moshi",
      "Spot chattering blue monkeys and black-and-white colobus in lush tree canopies",
      "Discover exotic tropical birds and native butterflies of Mount Kilimanjaro foothills",
      "Learn about local irrigation channels and visit nearby rice field plantations",
      "Led by an experienced local naturalist guide"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Guided Nature Walk & Canopy Wildlife",
        "activities": "Meet your naturalist guide at Springlands Hotel in Moshi. Set off on a gentle walking safari along shaded woodland trails. Learn about indigenous medicinal trees, spot playful blue monkeys and colobus monkeys leaping across tree branches, and observe vibrant endemic bird species.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Mid-Morning: Local Rice Fields & Cultural Farming Walk",
        "activities": "Walk toward the nearby agricultural community where local farmers cultivate rice fields and banana groves using centuries-old gravity irrigation systems. Interact with villagers before a relaxing walk back to Springlands Hotel.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Tropical Fruit Refreshments"
      }
    ],
    "included": [
      "Professional certified English-speaking naturalist guide",
      "Forest conservation permits and entry fees",
      "Bottled drinking water throughout the walk",
      "Roundtrip walking escort from Springlands Hotel"
    ],
    "notIncluded": [
      "Tips for the guide",
      "Personal expenses",
      "Travel insurance"
    ]
  },
  {
    "id": "marangu-waterfall-day-trip",
    "name": "Marangu Waterfall Day Trip",
    "category": "Day Trips",
    "duration": "1 Day",
    "priceRange": "$100",
    "fromPrice": 100,
    "badge": "Kilimanjaro Slopes",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 140,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 100,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 80,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 65,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MARANGU-WF-COVER.jpg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/MARANGU-WF-COVER-qsi4tzlsd2ywfcmg6scnrmmlsakwl1eabpjqu6taos.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MARANGU-WF-COVER.jpg",
    "highlights": [
      "Hike to the spectacular 80m high waterfall cascading into Fletcher Lake",
      "Trek through lush green tropical rainforest on the slopes of Mount Kilimanjaro",
      "Visit local Chagga coffee farms and traditional banana plantations",
      "Explore ancient Chagga defensive caves used during tribal wars",
      "Delicious hot picnic lunch with fresh tropical fruits"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Drive to Marangu & Rainforest Waterfall Hike",
        "activities": "Depart at 8:30 AM from Moshi driving through scenic banana and coffee plantations to Marangu village. Hike through dense tropical montane forest along the riverbank until reaching the dramatic 80-meter cascading Marangu waterfall. Swim in the cooling pool beneath the falls.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Afternoon: Chagga Cultural Village, Caves & Coffee Demonstration",
        "activities": "Enjoy a hearty picnic lunch by the falls. Tour an authentic Chagga cultural museum and descend into historical underground caves dug by the Chagga people to hide from Maasai warriors. Learn traditional coffee roasting and brewing before driving back to Moshi.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Picnic Lunch Box & Fresh Kilimanjaro Coffee"
      }
    ],
    "included": [
      "Private 4x4 transport with professional driver-guide",
      "All village fees, waterfall permits, and cultural cave entry fees",
      "Picnic lunch box and bottled drinking water",
      "Hotel pickup and drop-off in Moshi"
    ],
    "notIncluded": [
      "Guide gratuities",
      "Personal expenses",
      "Travel insurance"
    ]
  },
  {
    "id": "maasai-boma-day-trip",
    "name": "Maasai Boma Cultural Day Trip",
    "category": "Day Trips",
    "duration": "1 Day",
    "priceRange": "$36",
    "fromPrice": 36,
    "badge": "Cultural Immersion",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 90,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 36,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 30,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 25,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/maasai-boma1-quj0eomliq423umh5979wbutmmzg0963hchobwsin0.jpg",
    "hoverImage": "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/elementor/thumbs/maasai-boma1-quj0eomliq423umh5979wbutmmzg0963hchobwsin0.jpg",
    "highlights": [
      "Visit an authentic Maasai Boma village on the sweeping Maasai steppe",
      "Experience traditional Maasai welcome songs and the iconic jumping dance (Adumu)",
      "Step inside traditional Maasai homes (inkajijik) constructed from acacia and earth",
      "Learn about age-set warrior rituals, traditional cattle herding, and bush medicine",
      "Try your hand at Maasai spear throwing and authentic beadwork making"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Drive Across Maasai Steppe & Traditional Welcoming Ceremony",
        "activities": "Depart Moshi after breakfast heading into the arid savannah steppe. Be welcomed by Maasai warriors (morans) and women dressed in vibrant red shukas and beaded jewelry. Participate in the traditional greeting songs and witness the energetic Adumu jumping dance.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Afternoon: Boma Exploration, Spear Throwing & Bushcraft",
        "activities": "Guided by an English-speaking Maasai elder, enter their thatched roundhouses, learn how fire is created with two sticks, and discover natural medicinal herbs. Enjoy a picnic lunch under an acacia canopy, participate in spear throwing, and return to Moshi by 4:30 PM.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Picnic Lunch Box & Refreshments"
      }
    ],
    "included": [
      "Roundtrip private transport from Moshi/Arusha",
      "Maasai community contribution and village admission fees",
      "Dedicated local English-speaking Maasai guide",
      "Picnic lunch box and bottled drinking water"
    ],
    "notIncluded": [
      "Tips for village performers and guide",
      "Personal beadwork purchases",
      "Travel insurance"
    ]
  },
  {
    "id": "materuni-waterfall-day-trip",
    "name": "Materuni Waterfall & Coffee Tour",
    "category": "Day Trips",
    "duration": "1 Day",
    "priceRange": "$100",
    "fromPrice": 100,
    "badge": "Popular",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 140,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 100,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 75,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 60,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MATERUNI-DT.jpg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MATERUNI-DT-300x200.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MATERUNI-DT.jpg",
    "highlights": [
      "Scenic hike through Chagga village farmland to the roaring 80m Materuni Waterfall",
      "Swim in the crystal-clear mountain pool beneath the cascading falls",
      "Hands-on organic coffee making: pick, pulp, roast, and grind your own cup",
      "Savor an authentic hot Chagga tribal lunch with traditional banana beer (Mbege)",
      "Sing traditional Chagga harvest songs with village coffee farmers"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Village Hike to Roaring Materuni Waterfall",
        "activities": "Depart Moshi for a 45-minute drive up the green foothills of Kilimanjaro to Materuni village (2,500m). Embark on a 40-minute scenic trek through avocado, banana, and coffee groves. Reach the dramatic 80-meter waterfall plummeting into a deep natural pool. Swim or relax in the mist.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Afternoon: Authentic Chagga Lunch & Traditional Coffee Ceremony",
        "activities": "Return to the village home for a hot traditional Chagga buffet lunch cooked with local ingredients. Participate in the full coffee-making process from raw cherry to roasting over open coals and grinding in large wooden mortars while singing Chagga songs. Taste your fresh espresso before driving back.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Hot Traditional Chagga Lunch & Fresh Coffee Tasting"
      }
    ],
    "included": [
      "Round-trip transport from Moshi / Arusha in a private vehicle",
      "Materuni village entrance permits and waterfall fees",
      "Hot authentic Chagga lunch with local fruit and banana beer tasting",
      "Complete coffee-making workshop and unlimited fresh coffee",
      "Professional certified local guide and bottled water"
    ],
    "notIncluded": [
      "Guide gratuities",
      "Personal expenses",
      "Travel insurance"
    ]
  },
  {
    "id": "arusha-national-park-day-trip",
    "name": "Arusha National Park Safari Day Trip",
    "category": "Day Trips",
    "duration": "1 Day",
    "priceRange": "$306",
    "fromPrice": 306,
    "badge": "Walking & Game Drive",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 420,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 306,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 220,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 165,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/ARUSHA-NP.jpg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/ARUSHA-NP-300x200.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/ARUSHA-NP.jpg",
    "highlights": [
      "Full-day game drive in the jewel at the base of Mount Meru (4,565m)",
      "Armed ranger walking safari getting up close to giraffes and buffalos on foot",
      "Explore the dramatic steep cliffs of the volcanic Ngurdoto Crater",
      "View thousands of flamingos and waterbirds on the seven Momella Lakes",
      "Observe black-and-white colobus monkeys in the lush montane forest"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Armed Ranger Walking Safari & Ngurdoto Crater Rim",
        "activities": "Depart at 7:30 AM from Moshi or Arusha. Enter Arusha National Park and join an armed TANAPA park ranger for a 2-hour walking safari across open savannah, viewing giraffes, zebras, and warthogs up close. Drive up to the rim of Ngurdoto Crater, nicknamed \"Little Ngorongoro\".",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Afternoon: Momella Lakes Game Drive & Colobus Monkeys",
        "activities": "Enjoy a picnic lunch beside the scenic Momella Lakes while watching pink flamingos, pelicans, and waterfowl. Afternoon game drive through the montane forest to spot colobus monkeys, bushbucks, blue monkeys, and elephants with Mount Meru towering above before return.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Picnic Lunch Box & Refreshments"
      }
    ],
    "included": [
      "Transport in custom 4x4 safari Land Cruiser with pop-up roof",
      "All TANAPA Arusha National Park entry and conservation fees",
      "Armed park ranger for the walking safari",
      "Professional certified safari driver-guide",
      "Gourmet picnic lunch box and bottled mineral water"
    ],
    "notIncluded": [
      "Guide and ranger tips",
      "Alcoholic drinks",
      "Travel insurance"
    ]
  },
  {
    "id": "moshi-town-tour-day-trip",
    "name": "Moshi Cultural Town Tour",
    "category": "Day Trips",
    "duration": "1 Day (3-4 Hours)",
    "priceRange": "$60",
    "fromPrice": 60,
    "badge": "Town Life",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 90,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 60,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 45,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 30,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MOSHI-DT.jpg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MOSHI-DT-300x200.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MOSHI-DT.jpg",
    "highlights": [
      "Explore Moshi town at the base of Mount Kilimanjaro with a local guide",
      "Visit the vibrant outdoor central market packed with fresh produce and textiles",
      "Browse colorful Maasai curio and shuka craft markets",
      "Learn about colonial German and British history and architecture in Moshi",
      "Taste traditional local street food and enjoy panoramic Kilimanjaro views"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Central Market, Clock Tower & Historic Railway",
        "activities": "Meet your guide at Springlands Hotel or in central Moshi. Walk past the central Clock Tower, visit the old colonial German railway station with views of Kibo peak, and navigate the bustling outdoor vegetable and spice market.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Maasai Craft Market & Local Coffee Break",
        "activities": "Walk through the Maasai souvenir and textile market to observe hand-crafted wooden carvings, tinga-tinga paintings, and jewelry. Stop at a local cafe for a freshly brewed cup of Kilimanjaro highland coffee before returning to your hotel.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Kilimanjaro Coffee & Local Snack Tasting"
      }
    ],
    "included": [
      "Professional certified English-speaking local guide",
      "Guided walking tour of markets, historic sites, and monuments",
      "Fresh Kilimanjaro coffee tasting and bottled drinking water",
      "Springlands Hotel roundtrip transfer"
    ],
    "notIncluded": [
      "Guide gratuities",
      "Personal shopping and souvenirs",
      "Travel insurance"
    ]
  },
  {
    "id": "shira-plateau-day-trip",
    "name": "Kilimanjaro Shira Plateau Day Hike",
    "category": "Day Trips",
    "duration": "1 Day",
    "priceRange": "$211",
    "fromPrice": 211,
    "badge": "Kilimanjaro Adventure",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 320,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 211,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 150,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 110,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/shira-1.jpg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/shira-1-300x200.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/shira-1.jpg",
    "highlights": [
      "Reach 3,600m on Mount Kilimanjaro in a single day without a multi-day trek",
      "Scenic 4x4 drive through high-altitude rainforest up to Londorossi Gate and Shira barrier",
      "Hike across the breathtaking lunar-like volcanic Shira Plateau",
      "Spectacular unobstructed panoramic views of Kibo Peak and the Great Rift Valley",
      "Spot high-altitude alpine wildlife including elands, duikers, and birds of prey"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Scenic 4x4 Drive to High Altitude Shira Gate (3,600m)",
        "activities": "Depart at 7:00 AM from Moshi. Drive around the western slopes of Mount Kilimanjaro to Londorossi Gate for registration. Continue on a rugged 4x4 mountain track ascending through dense rainforest and heather moorland until reaching the Shira Plateau rim at 3,600 meters.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Shira Plateau Alpine Hike & Kibo Peak Panorama",
        "activities": "Hike across the ancient collapsed caldera of Kilimanjaro’s third peak. Marvel at giant senecios (groundsels) and lobelias. Savor a gourmet picnic lunch on the plateau with dramatic views of snowcapped Kibo Peak before descending back to Moshi.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Picnic Lunch Box & Hot Tea/Coffee"
      }
    ],
    "included": [
      "Private 4x4 safari vehicle transport to high-altitude Shira barrier",
      "All Kilimanjaro National Park (KINAPA) day hiking permits and fees",
      "Certified professional mountain guide and ranger",
      "Picnic lunch box, hot beverages, and bottled mineral water"
    ],
    "notIncluded": [
      "Guide gratuities",
      "Warm alpine clothing rentals",
      "Travel insurance"
    ]
  },
  {
    "id": "mandara-huts-day-trip",
    "name": "Kilimanjaro Mandara Huts Day Hike",
    "category": "Day Trips",
    "duration": "1 Day",
    "priceRange": "$211",
    "fromPrice": 211,
    "badge": "Iconic Trek",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 320,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 211,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 150,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 110,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MANDARA-DT.jpg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MANDARA-DT-300x200.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/MANDARA-DT.jpg",
    "highlights": [
      "Experience trekking on Mount Kilimanjaro’s legendary Marangu Route in one day",
      "Hike through dense, pristine tropical rainforest draped in ancient mosses and lichens",
      "Reach Mandara Huts complex at 2,720m (8,920 ft)",
      "Side excursion to Maundi Crater with sweeping views into Kenya across Lake Chala",
      "Encounter blue monkeys, black-and-white colobus, and endemic Kilimanjaro impatiens"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Marangu Gate (1,860m) to Mandara Huts (2,720m)",
        "activities": "Depart Moshi at 8:00 AM for Marangu Gate. Register with KINAPA and begin hiking along a well-maintained path through dense rainforest. Listen to calls of tropical birds and look for colobus monkeys in the canopy during the 3-4 hour ascent to Mandara Huts.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Afternoon: Maundi Crater Rim & Forest Descent",
        "activities": "Enjoy a picnic lunch at Mandara Huts. Take a short 15-minute side walk to the rim of Maundi Crater for panoramic vistas of the Kenyan plains. Begin the 2.5-hour gentle descent back to Marangu Gate, returning to Moshi by late afternoon.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Picnic Lunch Box & Hot Beverages"
      }
    ],
    "included": [
      "Kilimanjaro National Park entrance and rescue fees",
      "Certified English-speaking mountain guide",
      "Roundtrip private transport from Moshi to Marangu Gate",
      "Picnic lunch box and bottled drinking water"
    ],
    "notIncluded": [
      "Guide gratuities",
      "Trekking poles and gear",
      "Travel insurance"
    ]
  },
  {
    "id": "mkomazi-national-park-day-trip",
    "name": "Mkomazi National Park Safari Day Trip",
    "category": "Day Trips",
    "duration": "1 Day",
    "priceRange": "$306",
    "fromPrice": 306,
    "badge": "Rhino & Wild Dog",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 420,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 306,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 220,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 165,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/African-safari.jpg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/African-safari-1024x576.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/African-safari.jpg",
    "highlights": [
      "Visit northern Tanzania’s hidden wilderness sanctuary adjoining Kenya’s Tsavo West",
      "Tour the world-renowned Mkomazi Black Rhino Sanctuary to view endangered black rhinos",
      "See endangered African Wild Dogs (Painted Dogs) in their specialized breeding program",
      "Spot arid-adapted wildlife: fringe-eared oryx, lesser kudu, gerenuk, and lions",
      "Breathtaking scenery with the rugged Pare and Usambara mountains in the background"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Drive to Mkomazi & Rhino Sanctuary Encounter",
        "activities": "Depart at 6:30 AM from Moshi driving southeast (~2 hours) to Mkomazi National Park. Head directly to the fenced Black Rhino Sanctuary with a specialized ranger to track and view black rhinos roaming the acacia scrub.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Afternoon: African Wild Dog Project & Savannah Game Drive",
        "activities": "Visit the African Wild Dog breeding compound to learn about conservation efforts. Enjoy a picnic lunch at a scenic viewpoint, followed by an afternoon game drive spotting giraffe, buffalo, zebra, and oryx before driving back to Moshi.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Picnic Lunch Box & Refreshments"
      }
    ],
    "included": [
      "Private 4x4 safari Land Cruiser with pop-up roof",
      "Mkomazi National Park entrance and conservation fees",
      "Specialized Black Rhino Sanctuary entry permit and ranger",
      "Professional certified safari driver-guide",
      "Picnic lunch box and bottled mineral water"
    ],
    "notIncluded": [
      "Driver/guide tips",
      "Personal expenses",
      "Travel insurance"
    ]
  },
  {
    "id": "lake-chala-day-trip",
    "name": "Lake Chala Hike & Canoeing Day Trip",
    "category": "Day Trips",
    "duration": "1 Day",
    "priceRange": "$30",
    "fromPrice": 30,
    "badge": "Crater Lake",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 90,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 30,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 20,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/CHALLA-COVER.jpg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/challa.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/CHALLA-COVER.jpg",
    "highlights": [
      "Caldera crater lake spanning the border of Tanzania and Kenya with 100m deep turquoise water",
      "Fed by subterranean streams originating directly from the glaciers of Mount Kilimanjaro",
      "Scenic hike descending the steep volcanic crater walls surrounded by lush vegetation",
      "Kayaking and canoeing on the serene mirror-like waters surrounded by volcanic cliffs",
      "Spot colobus monkeys, baboons, and over 200 bird species including birds of prey"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Drive to Caldera Rim & Crater Wall Descent Hike",
        "activities": "Depart Moshi at 8:30 AM driving through rural Chagga countryside toward the Kenyan border. Arrive at the rim of Lake Chala Caldera. Hike down the steep volcanic crater walls through indigenous acacia and fig forests while birdwatching.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Afternoon: Kayaking on Crater Lake & Rimtop Picnic",
        "activities": "Board a kayak or canoe to paddle across the pristine, turquoise volcanic lake with water so clear you can see schools of endemic Lake Chala tilapia swimming below. Ascend back up for a picnic lunch on the crater rim with sweeping savanna views before driving back.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Picnic Lunch Box & Refreshments"
      }
    ],
    "included": [
      "Roundtrip private transport from Moshi / Arusha",
      "Lake Chala reserve entrance permits and guide fee",
      "Kayak / canoe rental and safety life vest",
      "Picnic lunch box and bottled drinking water"
    ],
    "notIncluded": [
      "Guide gratuities",
      "Personal expenses",
      "Travel insurance"
    ]
  },
  {
    "id": "chemka-hotsprings-day-trip",
    "name": "Chemka Hot Springs (Kikuletwa) Oasis",
    "category": "Day Trips",
    "duration": "1 Day",
    "priceRange": "$100",
    "fromPrice": 100,
    "badge": "Geothermal Oasis",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 140,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 100,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 75,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 60,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/chemka.jpg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/chemka-300x200.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/08/chemka.jpg",
    "highlights": [
      "Zanzibar-like turquoise geothermal oasis hidden in the semi-arid Maasai savannah",
      "Warm, crystal-clear subterranean mineral water bubbling up from underground aquifers",
      "Swim under the shade of massive centuries-old twisting fig trees",
      "Rope swing for adventurous leaps into deep natural turquoise pools",
      "Natural fish pedicure as tiny Garra Rufa fish gently nibble your feet in the shallows"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Off-Road Savannah Drive to Chemka Geothermal Oasis",
        "activities": "Depart Moshi or Arusha at 9:00 AM. Drive through semi-arid plains dotted with baobabs and acacia trees to Rundugai village. Arrive at Chemka Hot Springs (also known as Kikuletwa), a hidden turquoise pool fed by warm underground volcanic springs.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Afternoon: Swimming, Rope Swing & Local Swahili Barbecue",
        "activities": "Spend the day swimming in the warm, buoyant, crystal-clear water, leaping from the rope swing into the deep pool, and relaxing in the shade of enormous fig tree roots. Enjoy a freshly prepared hot lunch of grilled chicken, chips, and tropical fruits before afternoon return.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Hot Swahili Lunch & Tropical Fruit Platter"
      }
    ],
    "included": [
      "Roundtrip private transport from Moshi / Arusha in a private vehicle",
      "Chemka Hot Springs community entrance and conservation fees",
      "Fresh hot local lunch and bottled drinking water",
      "Professional driver-guide and swim assistance"
    ],
    "notIncluded": [
      "Swimwear and towel",
      "Guide gratuities",
      "Travel insurance"
    ]
  },
  {
    "id": "tarangire-national-park-day-trip",
    "name": "Tarangire National Park Safari Day Trip",
    "category": "Day Trips",
    "duration": "1 Day",
    "priceRange": "$306",
    "fromPrice": 306,
    "badge": "Big Five Safari",
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 420,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 306,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 220,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 165,
        "currency": "USD"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-29-at-16.52.38.jpeg",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/09/WhatsApp-Image-2023-09-29-at-16.52.38.jpeg",
    "highlights": [
      "Experience the \"Elephant Paradise\" with the largest concentration of elephants on earth",
      "Marvel at towering centuries-old African Baobab trees dominating the savannah landscape",
      "Full-day game drive along the Tarangire River, a vital dry-season wildlife lifeline",
      "High chances of spotting tree-climbing lions, leopards, cheetahs, and massive giraffe herds",
      "Over 550 bird species recorded, making it an internationally renowned birding haven"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Drive to Tarangire & Riverine Wildlife Game Drive",
        "activities": "Early morning departure at 6:30 AM from Moshi/Arusha to Tarangire National Park. Enter the park and immediately begin game drives along the Tarangire River valley. Watch huge family herds of up to 300 elephants digging for water in dry riverbeds.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Afternoon: Baobab Valley Exploration & Predator Search",
        "activities": "Enjoy a picnic lunch at the Matete or Silale swamp viewpoint overlooking wallowing elephants and buffaloes. Spend the afternoon tracking lions resting in acacia trees, cheetahs hunting in open grasslands, and rare fringe-eared oryx before returning to Moshi/Arusha.",
        "accommodation": "Springlands Hotel or your Moshi/Arusha lodge",
        "meals": "Picnic Lunch Box & Refreshments"
      }
    ],
    "included": [
      "Transport in custom 4x4 safari Land Cruiser with pop-up roof and charging ports",
      "All TANAPA Tarangire National Park entry and conservation fees",
      "Professional certified English-speaking safari guide",
      "Picnic lunch box and bottled mineral water throughout the day"
    ],
    "notIncluded": [
      "Guide gratuities",
      "Alcoholic drinks",
      "Travel insurance"
    ]
  },
  {
    "id": "safari-ngorongoro-wild-camp-4-days",
    "name": "Ngorongoro Wild Camp Safari",
    "category": "Safari",
    "duration": "4 Days",
    "priceRange": "$1,523 - $2,550",
    "fromPrice": 1523,
    "badge": "Popular",
    "rates": [
      {
        "pax": "1 Person",
        "price": 2550,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1850,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 1670,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1523,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/elep.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/LION-IN-NGORONGORO-1-1.jpeg",
    "highlights": [
      "Authentic stay at Ngorongoro Wild Camp with panoramic views",
      "Full descent into the world-famous Ngorongoro Crater caldera",
      "High chances of spotting the endangered Black Rhino & Big Five",
      "Lake Manyara National Park tree-climbing lions and flamingo flocks",
      "Cultural encounters and breathtaking Great Rift Valley viewpoints",
      "Custom 4x4 Safari Land Cruiser with guaranteed window seating"
    ],
    "included": [
      "Full board (breakfast, lunch & dinner) accommodation during safari",
      "All game drives viewing in a custom built 4×4 Safari Land Cruiser with pop-up roof",
      "All national park entrance fees and Ngorongoro Crater service fees",
      "Professional, English-speaking driver/guide",
      "Bottled drinking water throughout the safari game drives",
      "Complimentary airport transfers to/from Kilimanjaro (JRO) or Arusha Airport",
      "Pre-safari briefing at Springlands Hotel in Moshi"
    ],
    "notIncluded": [
      "International and domestic flights (unless specified for fly-in)",
      "Entry visa for Tanzania",
      "Optional hot air balloon safari over the savanna ($600 per person)",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Tips for safari driver-guide and hotel staff",
      "Travel and health insurance"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Moshi",
        "activities": "Upon your arrival at Kilimanjaro International Airport or Arusha Airport, our dedicated driver will warmly greet you with a sign bearing your name, ensuring a seamless and comfortable transfer to the charming Springlands Hotel. After checking in, you’ll be treated to a delicious meal and a pre-safari briefing from our experienced safari coordinators. This briefing will outline the exciting adventure ahead and provide practical tips for your journey. Take the rest of the day to relax and enjoy the serene surroundings, with amenities including a swimming pool, lovely gardens, and welcoming dining facilities.",
        "accommodation": "Springlands Hotel (Moshi)",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Journey to Ngorongoro Conservation Area",
        "activities": "After an early breakfast, depart Moshi for the scenic drive to the world-renowned Ngorongoro Conservation Area. Pass through vibrant local villages and ascend the dramatic Great Rift Valley escarpment. Arrive at Ngorongoro Wild Camp in time for lunch, taking in panoramic vistas of the surrounding highlands. In the afternoon, embark on a scenic game drive along the crater rim and surrounding plateau, spotting zebra, wildebeest, and bird species before enjoying sunset over the caldera.",
        "accommodation": "Ngorongoro Wild Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Exploration of Ngorongoro Crater",
        "activities": "Descend 600 meters down into the world’s largest intact volcanic caldera for a full-day wildlife extravaganza. The crater floor acts as a natural sanctuary hosting over 25,000 large mammals. Track the Big Five—lion, leopard, elephant, buffalo, and the critically endangered black rhino. Enjoy a picnic lunch beside the hippo pool at Ngoitoktok Springs while observing waterbirds and plains game grazing peacefully. In the late afternoon, ascend back to the crater rim and return to the camp for dinner and stargazing.",
        "accommodation": "Ngorongoro Wild Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Adventure in Lake Manyara National Park",
        "activities": "Depart after breakfast towards Lake Manyara National Park, nestled beneath the cliffs of the Manyara Escarpment. Drive through the lush groundwater forest home to playful baboon troops and blue monkeys. Progress onto the open acacia woodlands and alkaline lakeshore, renowned for thousands of pink flamingos, pelicans, and large elephant herds. Keep your eyes peeled on the branches of majestic mahogany and acacia trees for Manyara’s legendary tree-climbing lions. In the late afternoon, drive back to Moshi for an overnight stay.",
        "accommodation": "Springlands Hotel (Moshi)",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Departure Day",
        "activities": "Savor a leisurely breakfast at the hotel while taking in views of Mount Kilimanjaro. Depending on your flight schedule, our driver will transfer you to Kilimanjaro International Airport (JRO) or Arusha Airport for your onward journey home or connection to Zanzibar for a tropical beach holiday.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "safari-northern-circuit-6-days",
    "name": "Best of Ngorongoro, Tarangire & Lake Manyara",
    "category": "Safari",
    "duration": "6 Days",
    "priceRange": "$1,546 - $2,780",
    "fromPrice": 1546,
    "badge": "Best Seller",
    "rates": [
      {
        "pax": "1 Person",
        "price": 2780,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1980,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 1720,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1546,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/giraffe.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Best-of-Ngorongoro-Tarangire-and-Lake-Manyara-Safari3.jpeg",
    "highlights": [
      "Comprehensive 6-day immersion in Tanzania’s top northern parks",
      "Giant elephant herds and ancient baobabs in Tarangire National Park",
      "Descend into the UNESCO World Heritage Ngorongoro Crater",
      "Authentic cultural encounter with Hadzabe hunter-gatherers and Datoga blacksmiths at Lake Eyasi",
      "Spot tree-climbing lions and pink flamingos at Lake Manyara",
      "Stay in boutique wilderness lodges with stunning Rift Valley scenery"
    ],
    "included": [
      "Full board (breakfast, lunch & dinner) accommodation during safari",
      "All game drives viewing in a custom built 4×4 Safari Land Cruiser with pop-up roof",
      "All national park entrance fees and Ngorongoro Crater service fees",
      "Professional, English-speaking driver/guide",
      "Bottled drinking water throughout the safari game drives",
      "Complimentary airport transfers to/from Kilimanjaro (JRO) or Arusha Airport",
      "Pre-safari briefing at Springlands Hotel in Moshi"
    ],
    "notIncluded": [
      "International and domestic flights (unless specified for fly-in)",
      "Entry visa for Tanzania",
      "Optional hot air balloon safari over the savanna ($600 per person)",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Tips for safari driver-guide and hotel staff",
      "Travel and health insurance"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Moshi / Arusha",
        "activities": "Upon arrival at Kilimanjaro International Airport or Arusha Airport, our driver will warmly welcome you and transfer you to Springlands Hotel. Enjoy the pool, lush tropical gardens, and participate in a detailed safari briefing with our lead expedition coordinator.",
        "accommodation": "Springlands Hotel (Moshi)",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Tarangire National Park",
        "activities": "After breakfast, depart for Tarangire National Park, celebrated for its colossal baobab trees and Tanzania’s highest concentration of African elephants. Game drive along the Tarangire River valley where herds of zebra, wildebeest, buffalo, giraffe, and waterbuck gather. In the late afternoon, proceed to Highview Hotel or Coffee Lodge for dinner and relaxation.",
        "accommodation": "Highview Hotel / Highview Coffee Lodge",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Ngorongoro Crater",
        "activities": "Rise early and travel to Ngorongoro Crater. Descend the 600m caldera walls onto the lush grassland floor. Witness dense populations of predators including lions, hyenas, and jackals hunting across the plains. Visit Lake Magadi for thousands of flamingos and search the Lerai forest for elusive leopards and black rhinos. Overnight near Karatu or Lake Eyasi.",
        "accommodation": "Ngorongoro Safari Lodge / Highview Hotel",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Hadzabe & Datoga Cultural Visit at Lake Eyasi",
        "activities": "An unforgettable cultural day at Lake Eyasi. Join the indigenous Hadzabe bushmen on an authentic early morning hunting and foraging expedition, learning their traditional click-language and ancient survival techniques. Later, visit the Datoga pastoralists and blacksmiths who forge iron arrowheads and jewelry using traditional bellows. In the afternoon, return to your lodge for leisure.",
        "accommodation": "Highview Hotel / Lake Eyasi Safari Lodge",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Lake Manyara National Park",
        "activities": "Explore Lake Manyara National Park, famous for its underground springs, lush groundwater forest, and sprawling alkaline soda lake. Spot baboons, blue monkeys, elephants, hippos in the pool, and Manyara’s iconic tree-climbing lions resting in the acacia branches. In the late afternoon, drive back to Moshi.",
        "accommodation": "Springlands Hotel (Moshi)",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Departure Day",
        "activities": "Enjoy breakfast at your hotel. Relax on the terrace or do some souvenir shopping before your transfer to Kilimanjaro International Airport or Arusha Airport for your departure flight.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "safari-serengeti-flying-5-days",
    "name": "Serengeti Flying Safari",
    "category": "Safari",
    "duration": "5 Days",
    "priceRange": "$1,915 - $3,450",
    "fromPrice": 1915,
    "badge": "Fly-in Safari",
    "rates": [
      {
        "pax": "1 Person",
        "price": 3450,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 2490,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 2140,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1915,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/flight.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Serengeti-34.jpg",
    "highlights": [
      "Scenic domestic flight directly into the heart of Central Serengeti (Seronera)",
      "Maximize wildlife viewing time by avoiding long overland transit drives",
      "Endless plains teeming with the Great Wildebeest Migration & apex predators",
      "Two full days exploring Seronera Valley and iconic granite kopjes",
      "Optional sunrise hot air balloon flight with champagne bush breakfast",
      "Luxury tented wild camp under starlit African skies"
    ],
    "included": [
      "Internal scenic bush flight to or from Serengeti airstrip (Seronera)",
      "Full board (breakfast, lunch & dinner) accommodation during safari",
      "All game drives viewing in a custom built 4×4 Safari Land Cruiser with pop-up roof",
      "All national park entrance fees and Ngorongoro Crater service fees",
      "Professional, English-speaking driver/guide",
      "Bottled drinking water throughout the safari game drives",
      "Complimentary airport transfers to/from Kilimanjaro (JRO) or Arusha Airport",
      "Pre-safari briefing at Springlands Hotel in Moshi"
    ],
    "notIncluded": [
      "International and domestic flights (unless specified for fly-in)",
      "Entry visa for Tanzania",
      "Optional hot air balloon safari over the savanna ($600 per person)",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Tips for safari driver-guide and hotel staff",
      "Travel and health insurance"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Moshi / Arusha",
        "activities": "Arrive at Kilimanjaro International Airport or Arusha Airport. Meet your personal transfer driver and travel to Springlands Hotel in Moshi. Receive a comprehensive safari briefing on your flight timings and Serengeti adventures, followed by dinner and an evening relaxing by the pool.",
        "accommodation": "Springlands Hotel (Moshi)",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Flight to Serengeti & Central Seronera Game Drive",
        "activities": "Transfer to the airport for your scenic morning flight over the Great Rift Valley directly into the heart of Serengeti National Park (Seronera airstrip). Meet your safari guide and begin an afternoon game drive across the savannah plains. Seronera is celebrated for resident big cats—lions lounging on rocky kopjes, cheetahs scanning the open plains, and leopards draped over acacia branches. Arrive at Serengeti Wild Camp for dinner under the African stars.",
        "accommodation": "Serengeti Wild Camp / Serengeti Safari Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Full Day in Serengeti National Park",
        "activities": "Spend a thrilling full day discovering the boundless wilderness of the Serengeti. Follow the migration herds of wildebeest and zebra, search the Seronera riverbanks for basking crocodiles and hippos, and look out for serval cats, bat-eared foxes, and majestic martial eagles. Enjoy a picnic lunch surrounded by wild plains before continuing your afternoon wildlife search.",
        "accommodation": "Serengeti Wild Camp / Serengeti Safari Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Morning Game Drive & Return Flight to Arusha",
        "activities": "Early morning game drive during the golden hour when predators are at their most active. (Optional sunrise Hot Air Balloon safari can be arranged). After a bush brunch, transfer to Seronera airstrip for your return flight back to Arusha. Upon landing, transfer back to Springlands Hotel for dinner and overnight.",
        "accommodation": "Springlands Hotel (Moshi)",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Departure Day",
        "activities": "After breakfast, transfer to Kilimanjaro International Airport (JRO) or Arusha Airport for your departure flight home, or take an onward flight to Zanzibar to unwind on world-class tropical beaches.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "safari-ngorongoro-crater-4-days",
    "name": "Ngorongoro Crater Safari",
    "category": "Safari",
    "duration": "4 Days",
    "priceRange": "$1,465 - $2,450",
    "fromPrice": 1465,
    "badge": "Short Safari",
    "rates": [
      {
        "pax": "1 Person",
        "price": 2450,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1780,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 1610,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1465,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/ngrongo.png",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/NGORONGORO-.jpeg",
    "highlights": [
      "Short, action-packed safari perfect for travelers with limited time",
      "Explore Tarangire’s famous elephant concentrations and baobab landscapes",
      "Full descent into the spectacular Ngorongoro Crater caldera",
      "Unsurpassed predator viewing including lions, cheetahs, and spotted hyenas",
      "Scenic highland views across Karatu and the Great Rift Valley",
      "Comfortable lodge accommodations with warm Tanzanian hospitality"
    ],
    "included": [
      "Full board (breakfast, lunch & dinner) accommodation during safari",
      "All game drives viewing in a custom built 4×4 Safari Land Cruiser with pop-up roof",
      "All national park entrance fees and Ngorongoro Crater service fees",
      "Professional, English-speaking driver/guide",
      "Bottled drinking water throughout the safari game drives",
      "Complimentary airport transfers to/from Kilimanjaro (JRO) or Arusha Airport",
      "Pre-safari briefing at Springlands Hotel in Moshi"
    ],
    "notIncluded": [
      "International and domestic flights (unless specified for fly-in)",
      "Entry visa for Tanzania",
      "Optional hot air balloon safari over the savanna ($600 per person)",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Tips for safari driver-guide and hotel staff",
      "Travel and health insurance"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Moshi / Arusha",
        "activities": "Arrive at Kilimanjaro International Airport or Arusha Airport. Warmly met by your driver and transferred to Springlands Hotel. Settle in, enjoy the pool, and participate in a pre-safari briefing detailing the upcoming Tarangire and Ngorongoro explorations.",
        "accommodation": "Springlands Hotel (Moshi)",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Tarangire National Park",
        "activities": "Depart Moshi after breakfast and drive through the Maasai Steppe to Tarangire National Park. Known as the home of the elephants, Tarangire is famous for herds numbering in the hundreds, alongside majestic baobabs, giraffes, wildebeests, and waterbucks along the Tarangire River. Continue to Highview Hotel for dinner and overnight.",
        "accommodation": "Highview Hotel / Highview Coffee Lodge",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Ngorongoro Crater",
        "activities": "Early morning drive to the Ngorongoro Conservation Area. Descend 2,000 feet into the world’s largest intact caldera for a breathtaking safari. Search for the endangered black rhino, lions, prides of hyenas, zebras, and elands. Picnic lunch next to the hippo pool. In the afternoon, ascend the crater walls and return to Moshi.",
        "accommodation": "Springlands Hotel (Moshi)",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Departure Day",
        "activities": "Enjoy a leisurely breakfast overlooking Mount Kilimanjaro before transferring to Kilimanjaro International Airport for your onward international flight or Zanzibar extension.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ]
  },
  {
    "id": "safari-tanzania-classic-4-days",
    "name": "Tanzania Classic Safari",
    "category": "Safari",
    "duration": "4 Days",
    "priceRange": "$1,415 - $2,380",
    "fromPrice": 1415,
    "badge": "Classic Choice",
    "rates": [
      {
        "pax": "1 Person",
        "price": 2380,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1720,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 1550,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1415,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/tanzani-classic.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/NGORONGORO-LIONS.jpeg",
    "highlights": [
      "Tanzania’s classic circuit: Tarangire, Ngorongoro Crater & Lake Manyara",
      "Dense wildlife spotting in three ecologically distinct conservation areas",
      "High density of lions, elephants, giraffes, zebras, and tropical bird species",
      "Flocks of pink flamingos on Lake Manyara’s alkaline waters",
      "Breathtaking vistas of the Great Rift Valley escarpment",
      "Personalized guiding in private 4x4 safari vehicle"
    ],
    "included": [
      "Full board (breakfast, lunch & dinner) accommodation during safari",
      "All game drives viewing in a custom built 4×4 Safari Land Cruiser with pop-up roof",
      "All national park entrance fees and Ngorongoro Crater service fees",
      "Professional, English-speaking driver/guide",
      "Bottled drinking water throughout the safari game drives",
      "Complimentary airport transfers to/from Kilimanjaro (JRO) or Arusha Airport",
      "Pre-safari briefing at Springlands Hotel in Moshi"
    ],
    "notIncluded": [
      "International and domestic flights (unless specified for fly-in)",
      "Entry visa for Tanzania",
      "Optional hot air balloon safari over the savanna ($600 per person)",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Tips for safari driver-guide and hotel staff",
      "Travel and health insurance"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Moshi / Arusha",
        "activities": "Arrive at Kilimanjaro International Airport or Arusha Airport. Met by our representative and transferred to Springlands Hotel. Attend a pre-safari briefing and unwind by the hotel pool and tropical gardens.",
        "accommodation": "Springlands Hotel (Moshi)",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Tarangire National Park",
        "activities": "After breakfast, depart for Tarangire National Park. Enjoy an extensive game drive across the savannah and along the Tarangire River, spotting elephant families, lions, zebras, wildebeest, and towering baobab trees. Overnight at Highview Hotel.",
        "accommodation": "Highview Hotel / Highview Coffee Lodge",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Ngorongoro Crater",
        "activities": "Drive to Ngorongoro Conservation Area and descend 600m onto the crater floor. Spend the day tracking the Big Five (lion, leopard, rhino, elephant, buffalo) and observing grazing gazelles, wildebeests, and waterbirds at Lake Magadi. Evening return to lodge.",
        "accommodation": "Highview Hotel / Ngorongoro Wild Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Lake Manyara National Park & Departure",
        "activities": "Morning exploration of Lake Manyara National Park, driving through lush groundwater forest and along the flamingo-fringed lakeshore. Look for tree-climbing lions, baboons, and hornbills. In the afternoon, return to Moshi or transfer directly to Kilimanjaro International Airport for your departure flight.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-selous-game-reserve-5-days",
    "name": "Best of Selous Game Reserve Safari",
    "category": "Safari",
    "duration": "5 Days",
    "priceRange": "$1,300 - $2,250",
    "fromPrice": 1300,
    "badge": "Southern Circuit",
    "rates": [
      {
        "pax": "1 Person",
        "price": 2250,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1620,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 1450,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1300,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/07/bnr-sec.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/Best-Selous-Game-Reserve-safari3.jpeg",
    "highlights": [
      "Pristine wilderness of Nyerere National Park (Selous Game Reserve)",
      "Thrilling sunset boat safari along the Rufiji River spotting hippos & crocodiles",
      "Guided walking safari led by armed park rangers through the African bush",
      "High concentrations of endangered African wild dogs and buffalo herds",
      "Far less crowded southern circuit offering deep exclusivity and serenity",
      "Comfortable tented lodge situated right along the riverbanks"
    ],
    "included": [
      "Rufiji River boat safari excursion",
      "Guided bush walking safari with armed ranger",
      "Full board (breakfast, lunch & dinner) accommodation during safari",
      "All game drives viewing in a custom built 4×4 Safari Land Cruiser with pop-up roof",
      "All national park entrance fees and Ngorongoro Crater service fees",
      "Professional, English-speaking driver/guide",
      "Bottled drinking water throughout the safari game drives",
      "Complimentary airport transfers to/from Kilimanjaro (JRO) or Arusha Airport",
      "Pre-safari briefing at Springlands Hotel in Moshi"
    ],
    "notIncluded": [
      "International and domestic flights (unless specified for fly-in)",
      "Entry visa for Tanzania",
      "Optional hot air balloon safari over the savanna ($600 per person)",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Tips for safari driver-guide and hotel staff",
      "Travel and health insurance"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arrival in Dar es Salaam",
        "activities": "Upon arrival at Julius Nyerere International Airport in Dar es Salaam, you will be warmly welcomed and transferred to Peacock Hotel in the city center. Enjoy an evening meal and briefing on your upcoming southern circuit journey to Selous.",
        "accommodation": "Peacock Hotel (Dar es Salaam)",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Journey to Selous Game Reserve & Sunset Boat Safari",
        "activities": "Early morning departure by safari vehicle from Dar es Salaam heading south towards Selous Game Reserve (Nyerere National Park), passing through picturesque miombo woodlands and rural communities. Arrive at Selous Kinga Lodge / River Camp in time for lunch. In the late afternoon, embark on a spectacular boat safari along the Rufiji River, witnessing hippos, basking crocodiles, and colorful waterbirds as the sun sets over the river.",
        "accommodation": "Selous Kinga Lodge / Safari Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Full Day Game Drive in Selous",
        "activities": "A full day dedicated to tracking wildlife across the sprawling Selous wilderness. Explore the chain of oxbow lakes including Lake Manze and Lake Nzelekela, renowned for attracting lions, leopards, wild dogs, giraffes, zebras, and massive herds of buffalo. Enjoy a bush picnic lunch in the shade of a tamarind tree before continuing your afternoon game drive.",
        "accommodation": "Selous Kinga Lodge / Safari Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Morning Bush Walking Safari & Game Exploration",
        "activities": "Experience the African wilderness on foot during an early morning guided walking safari accompanied by an armed park ranger. Discover animal tracks, medicinal plants, insects, and birdlife up close. Return to the lodge for a hearty breakfast, followed by an afternoon game drive focusing on predator hotspots.",
        "accommodation": "Selous Kinga Lodge / Safari Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Departure from Selous to Dar es Salaam",
        "activities": "Enjoy a relaxed breakfast along the river before beginning the drive back to Dar es Salaam. Arrive in the late afternoon for drop-off at your hotel or at Julius Nyerere International Airport for your departure flight.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-fly-in-tarangire-ngorongoro-2-days",
    "name": "2-Day Fly-In Safari from Zanzibar: Tarangire & Ngorongoro",
    "category": "Safari",
    "duration": "2 Days",
    "priceRange": "$1,530",
    "fromPrice": 1530,
    "badge": "Zanzibar Fly-in",
    "rates": [
      {
        "pax": "1 Person",
        "price": 2150,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1530,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1350,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-26-at-10.02.47-650x400.jpeg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-26-at-10.02.47.jpeg",
    "highlights": [
      "Scenic flight directly from Zanzibar to Arusha / Kilimanjaro",
      "Giant elephant herds and majestic baobab trees in Tarangire",
      "Full descent into the world-famous Ngorongoro Crater caldera",
      "High chances of spotting the Big Five in just two days",
      "Overnight stay at a charming lodge in Karatu highland",
      "Seamless same-day return flight back to Zanzibar"
    ],
    "included": [
      "Return Domestic Flights (Zanzibar / Arusha / Serengeti / Nyerere)",
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Fly Zanzibar to Arusha & Game Drive in Tarangire",
        "activities": "Early morning transfer from your Zanzibar beach hotel to Zanzibar Airport for your flight to Arusha. Upon landing, meet your safari guide and drive straight to Tarangire National Park. Enjoy a thrilling game drive along the Tarangire River, observing famous elephant families, giraffes, zebras, lions, and iconic baobab trees. Savor a picnic lunch in the park before ascending the Great Rift Valley escarpment to Karatu for dinner and overnight.",
        "accommodation": "Marera Valley Lodge / Country Lodge Karatu",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Ngorongoro Crater Exploration & Fly Back to Zanzibar",
        "activities": "Early morning descent into the 600m deep Ngorongoro Crater floor. Track lions, cheetahs, hyenas, and search for the endangered black rhino. Enjoy a picnic lunch by the hippo pool at Ngoitoktok Springs. In the afternoon, ascend the crater walls and transfer directly to the airport for your scheduled evening flight back to Zanzibar.",
        "accommodation": "N/A (Return to Zanzibar)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-mikumi-2-days",
    "name": "2-Day Mikumi National Park Safari from Dar es Salaam",
    "category": "Safari",
    "duration": "2 Days",
    "priceRange": "$270",
    "fromPrice": 270,
    "badge": "Short Getaway",
    "rates": [
      {
        "pax": "1 Person",
        "price": 490,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 270,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 190,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/07/mikumi-national-park-2bg-650x400.webp",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/07/mikumi-national-park-2bg.webp",
    "highlights": [
      "Fast, accessible safari departing directly from Dar es Salaam",
      "Mkata Floodplain—often called a \"Little Serengeti\"",
      "Great populations of elephants, giraffes, buffaloes, and zebras",
      "Lions frequently spotted lounging on tree trunks and anthills",
      "Hippo pools and abundant tropical birdlife"
    ],
    "included": [
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Dar es Salaam to Mikumi National Park",
        "activities": "Early morning pickup from your hotel or airport in Dar es Salaam. Drive west through scenic Tanzanian countryside (~5 hours) to Mikumi National Park. Arrive in time for lunch at your lodge, followed by an afternoon game drive across the Mkata Floodplain until sunset.",
        "accommodation": "Camp Bastian Mikumi / Mikumi Wildlife Camp",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Morning Game Drive & Return to Dar es Salaam",
        "activities": "Dawn game drive to catch active predators returning from night hunts. Visit the hippo pool to observe hippos and Nile crocodiles. Return to lodge for brunch, check out, and journey back to Dar es Salaam arriving by late afternoon.",
        "accommodation": "N/A (Drop-off Dar es Salaam)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-nyerere-fly-in-2-days",
    "name": "2-Day Nyerere National Park Fly-In Safari from Zanzibar",
    "category": "Safari",
    "duration": "2 Days",
    "priceRange": "$1,432",
    "fromPrice": 1432,
    "badge": "Zanzibar Fly-in",
    "rates": [
      {
        "pax": "1 Person",
        "price": 1950,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1432,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1280,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/09/5891039283236684862_121-650x400.jpg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/09/5891039283236684862_121.jpg",
    "highlights": [
      "Quick 45-minute flight straight from Zanzibar into Nyerere (Selous)",
      "Spectacular boat safari on the Rufiji River among hippos and crocs",
      "Vast wilderness with high lion density and wild dog sightings",
      "Peaceful, uncrowded southern circuit atmosphere",
      "Riverside tented camp experience"
    ],
    "included": [
      "Return Domestic Flights (Zanzibar / Arusha / Serengeti / Nyerere)",
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Fly Zanzibar to Nyerere & Sunset Boat Safari",
        "activities": "Board your morning bush plane from Zanzibar to Nyerere National Park. Meet your guide upon landing and transfer to your riverside camp for lunch. In the late afternoon, enjoy an unforgettable boat safari on the Rufiji River watching elephants drinking and hippos wallowing as the sun sets.",
        "accommodation": "Rufiji River Camp / Selous Kinga Lodge",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Morning Game Drive & Fly Back to Zanzibar",
        "activities": "Early morning game drive exploring oxbow lakes and miombo woodland tracking lions, giraffes, zebras, and African wild dogs. Return to camp for breakfast, then transfer to the airstrip for your return flight to Zanzibar.",
        "accommodation": "N/A (Return to Zanzibar)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-serengeti-fly-in-3-days",
    "name": "3-Day Fly-In Serengeti Safari from Zanzibar",
    "category": "Safari",
    "duration": "3 Days",
    "priceRange": "$2,239",
    "fromPrice": 2239,
    "badge": "Serengeti Fly-in",
    "rates": [
      {
        "pax": "1 Person",
        "price": 3050,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 2239,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1990,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/09/serengeti-new-photo-51-650x400.jpg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/09/serengeti-new-photo-51.jpg",
    "highlights": [
      "Direct flights from Zanzibar into central Seronera airstrip",
      "Two full nights inside Serengeti National Park",
      "Prime predator action: lions, leopards, and cheetahs on kopjes",
      "Great Migration herds across the boundless savanna plains",
      "Authentic tented camp experience under African stars"
    ],
    "included": [
      "Return Domestic Flights (Zanzibar / Arusha / Serengeti / Nyerere)",
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Fly Zanzibar to Central Serengeti & Afternoon Game Drive",
        "activities": "Depart Zanzibar on a morning flight landing in Seronera in the heart of the Serengeti. Meet your guide and immediately embark on an introductory game drive tracking big cats and plains game before settling into your luxury tented camp.",
        "accommodation": "Serengeti Safari Camp / Osupuko Camp",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Full Day Wildlife Safari in Serengeti",
        "activities": "Spend the entire day exploring Seronera Valley, Retina Hippo Pool, and the iconic granite kopjes. Witness apex predators on the hunt and follow migrating wildebeests and zebras. Enjoy a picnic lunch in the wild savanna.",
        "accommodation": "Serengeti Safari Camp / Osupuko Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Morning Game Drive & Flight Back to Zanzibar",
        "activities": "Sunrise game drive during the golden hour to catch leopards and lions active. After a hearty bush breakfast, transfer to Seronera airstrip for your afternoon flight back to Zanzibar.",
        "accommodation": "N/A (Return to Zanzibar)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-mikumi-3-days",
    "name": "3-Day Mikumi National Park Safari from Dar es Salaam",
    "category": "Safari",
    "duration": "3 Days",
    "priceRange": "$560",
    "fromPrice": 560,
    "badge": "Popular",
    "rates": [
      {
        "pax": "1 Person",
        "price": 850,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 560,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 420,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/07/mikumi-national-park-2bg-650x400.webp",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/07/mikumi-national-park-2bg.webp",
    "highlights": [
      "Comprehensive 3-day exploration of Mikumi National Park",
      "Two nights in safari lodge near park gates",
      "Full day on the Mkata plains searching for lions, wild dogs & leopards",
      "Visit local Maasai boma community near Mikumi",
      "Affordable adventure ideal for travelers based in Dar es Salaam"
    ],
    "included": [
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Dar es Salaam to Mikumi & Sunset Game Drive",
        "activities": "Morning departure from Dar es Salaam heading inland through Chalinze and Morogoro. Arrive at Mikumi by midday for lunch. Head out on a late afternoon game drive across the plains as the sun sets over the Uluguru Mountains.",
        "accommodation": "Camp Bastian Mikumi",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Full Day Game Drive in Mikumi National Park",
        "activities": "Dedicate the full day to traversing the open grasslands and acacia woodlands of Mikumi. Spot large herds of elephants, buffaloes, giraffes, elands, and lions. Midday picnic lunch at a shaded viewpoint.",
        "accommodation": "Camp Bastian Mikumi",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Maasai Cultural Tour & Return to Dar es Salaam",
        "activities": "Morning cultural visit to an authentic Maasai village near the park to learn about local pastoralist traditions and beadwork. Afterwards, begin the drive back to Dar es Salaam with drop-off at your hotel or airport.",
        "accommodation": "N/A (Drop-off Dar es Salaam)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-ndutu-calving-3-days",
    "name": "3-Day Ndutu Calving Season Safari in Tanzania",
    "category": "Safari",
    "duration": "3 Days",
    "priceRange": "$1,133",
    "fromPrice": 1133,
    "badge": "Calving Season",
    "rates": [
      {
        "pax": "1 Person",
        "price": 1650,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1133,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 950,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/10/wildebeest-calving-in-ndutu.jpg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/10/wildebeest-calving-in-ndutu.jpg",
    "highlights": [
      "Witness thousands of newborn wildebeests and zebras in Ndutu",
      "Spectacular predator hunting action (cheetahs, lions, hyenas)",
      "Southern Serengeti plains and Lake Ndutu alkaline shores",
      "Off-road game driving permitted in designated Ndutu areas",
      "Stay in wilderness tented camp right amidst the migration"
    ],
    "included": [
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arusha to Ndutu Plains (South Serengeti)",
        "activities": "Pick up in Arusha after breakfast and drive through the scenic Ngorongoro Highlands to the Ndutu region on the border of Southern Serengeti. Arrive for lunch, followed by an afternoon game drive exploring the calving grounds where thousands of wildebeests gather.",
        "accommodation": "Ndutu Safari Lodge / Heritage Ndutu Camp",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Full Day Calving Season Safari in Ndutu",
        "activities": "Full day exploring the acacia woodlands and open soda lake shores of Ndutu. Watch newborn calves taking their first steps within minutes of birth, with cheetahs and big cat prides stalking the herds. Enjoy a bush picnic lunch.",
        "accommodation": "Ndutu Safari Lodge / Heritage Ndutu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Morning Game Drive & Return to Arusha",
        "activities": "Early morning game drive around Lake Ndutu and marshes to spot flamingos, lions, and caracals. Depart Ndutu by mid-morning and return through the Great Rift Valley to Arusha by late afternoon.",
        "accommodation": "N/A (Drop-off Arusha)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-nyerere-3-days",
    "name": "3-Day Nyerere National Park Safari from Dar es Salaam",
    "category": "Safari",
    "duration": "3 Days",
    "priceRange": "$750",
    "fromPrice": 750,
    "badge": "Wilderness",
    "rates": [
      {
        "pax": "1 Person",
        "price": 1150,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 750,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 590,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/07/nyerere-650x400.webp",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/07/nyerere.webp",
    "highlights": [
      "Complete immersion in Africa’s largest game reserve",
      "Thrilling boat safari on the Rufiji River",
      "Guided walking safari accompanied by armed rangers",
      "High concentrations of lions, leopards, wild dogs, and hippos",
      "Relaxing lodge stays on the riverbanks"
    ],
    "included": [
      "Sunset Boat Safari on Rufiji River",
      "Guided Bush Walking Safari with Armed Ranger",
      "Private 4×4 Safari Vehicle with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Dar es Salaam to Nyerere & Sunset Boat Safari",
        "activities": "Morning departure from Dar es Salaam through rural Tanzania to Nyerere National Park (~5-6 hours). Check into your river lodge and enjoy lunch. In the late afternoon, take a boat safari along the Rufiji River to view hippos, crocodiles, and waterbirds.",
        "accommodation": "Selous Kinga Lodge / Rufiji River Camp",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Full Day Game Drive across Nyerere Reserve",
        "activities": "Full day game drive exploring the reserve’s network of oxbow lakes, miombo woodlands, and open savannah. Track lions, leopards, wild dogs, giraffes, and massive herds of cape buffaloes. Picnic lunch in the bush.",
        "accommodation": "Selous Kinga Lodge / Rufiji River Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Bush Walking Safari & Return to Dar es Salaam",
        "activities": "Dawn guided walking safari with an armed ranger to experience the smaller details of the African bush on foot. Return for a hearty breakfast and journey back to Dar es Salaam arriving in the afternoon.",
        "accommodation": "N/A (Drop-off Dar es Salaam)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-fly-in-luxury-4-days",
    "name": "4-Day Fly-In Luxury Safari: Serengeti & Ngorongoro",
    "category": "Safari",
    "duration": "4 Days",
    "priceRange": "$5,744",
    "fromPrice": 5744,
    "badge": "Ultra Luxury",
    "rates": [
      {
        "pax": "1 Person",
        "price": 7300,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 5744,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 5000,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/08/4-day-Tanzania-safari-650x400.jpg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/08/4-day-Tanzania-safari.jpg",
    "highlights": [
      "VIP fly-in safari minimizing transit time and maximizing comfort",
      "Luxury 5-star tented camp accommodations (Four Seasons / Melia style)",
      "Private game drives in Serengeti and exclusive descent into Ngorongoro",
      "Gourmet fine dining and premium drinks included in camp",
      "Top-tier expert naturalist private guide"
    ],
    "included": [
      "Return Domestic Flights (Zanzibar / Arusha / Serengeti / Nyerere)",
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Scenic Flight to Serengeti & Luxury Game Drive",
        "activities": "Fly into the Serengeti airstrip where your private luxury safari vehicle awaits. Embark on a premier game drive through Seronera before arriving at your 5-star tented camp for cocktails and a gourmet dinner overlooking the savannah.",
        "accommodation": "Four Seasons Safari Lodge / Melia Serengeti",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Full Day Private Serengeti Exploration",
        "activities": "Enjoy morning and afternoon private game drives following the Great Migration and apex big cats. Relax during midday heat with infinity pool views or spa treatments before an evening sundowner in the wild.",
        "accommodation": "Four Seasons Safari Lodge / Melia Serengeti",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Serengeti to Ngorongoro Highlands Luxury Lodge",
        "activities": "Morning game drive through Serengeti before travelling across Olduvai Gorge to the rim of Ngorongoro. Check in to an iconic crater-rim luxury lodge offering sweeping views over the volcanic caldera.",
        "accommodation": "Ngorongoro Crater Lodge / Neptune Ngorongoro",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Ngorongoro Crater Descent & Departure Flight",
        "activities": "Early morning private descent onto the crater floor for five-star wildlife viewing including black rhinos and lions. After an elegant bush lunch, transfer to the airstrip for your departure flight.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-ndutu-crater-4-days",
    "name": "4-Day Ndutu Calving Season & Ngorongoro Crater Safari",
    "category": "Safari",
    "duration": "4 Days",
    "priceRange": "$1,799",
    "fromPrice": 1799,
    "badge": "Calving Season",
    "rates": [
      {
        "pax": "1 Person",
        "price": 2450,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1799,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1550,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-06-11-at-1.54.39-PM-2-650x400.jpeg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-06-11-at-1.54.39-PM-2.jpeg",
    "highlights": [
      "Two full days in the Ndutu calving sector during peak migration season",
      "Dramatic predator-prey encounters on open plains",
      "Complete descent into the world-famous Ngorongoro Crater",
      "Spotting the endangered black rhino and the Big Five",
      "Wilderness tented camp stay immersed in nature"
    ],
    "included": [
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arusha to Ndutu Plains (Calving Grounds)",
        "activities": "Depart Arusha early morning and travel through the scenic Ngorongoro Highlands into the Ndutu region. Arrive for lunch and take an afternoon game drive tracking the massive wildebeest herds and active cheetah coalitions.",
        "accommodation": "Ndutu Safari Lodge / Kenzan Ndutu Camp",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Full Day in Ndutu Migration Heartland",
        "activities": "Spend the day roaming the southern plains where over 8,000 calves are born daily during peak season. Track lions, leopards, hyenas, and jackals taking advantage of the calving event. Picnic lunch in the acacia woodlands.",
        "accommodation": "Ndutu Safari Lodge / Kenzan Ndutu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Ndutu to Ngorongoro Conservation Area",
        "activities": "Morning game drive around Lake Ndutu soda lake, then journey east across the crater highlands to Karatu, enjoying panoramic views over the Great Rift Valley.",
        "accommodation": "Marera Valley Lodge / Farm House Karatu",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Ngorongoro Crater Descent & Return to Arusha",
        "activities": "Descend into the 600m caldera for a spectacular morning game drive. Spot the Big Five, visit the flamingo-filled Lake Magadi, and enjoy lunch by the hippo pool before driving back to Arusha.",
        "accommodation": "N/A (Drop-off Arusha)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-tarangire-serengeti-ngorongoro-4-days",
    "name": "4-Day Tanzania Safari: Tarangire, Serengeti & Ngorongoro",
    "category": "Safari",
    "duration": "4 Days",
    "priceRange": "$1,880",
    "fromPrice": 1880,
    "badge": "Classic Northern",
    "rates": [
      {
        "pax": "1 Person",
        "price": 2550,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1880,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1620,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/08/4-day-Tanzania-safari-650x400.jpg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/08/4-day-Tanzania-safari.jpg",
    "highlights": [
      "The quintessential Northern Circuit trio in 4 action-packed days",
      "Giant elephant herds and baobab trees in Tarangire",
      "Endless plains and big cats of Central Serengeti",
      "Full descent into the magnificent Ngorongoro Crater",
      "Excellent balance of comfort, driving routes, and wildlife density"
    ],
    "included": [
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arusha to Tarangire National Park",
        "activities": "Morning departure from Arusha to Tarangire National Park. Enjoy an extensive game drive spotting large elephant families, lions, zebras, and giraffes along the Tarangire River. Overnight near the park or Karatu.",
        "accommodation": "Eileen’s Trees Inn / Highview Hotel",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Tarangire to Central Serengeti National Park",
        "activities": "Drive up through Ngorongoro Conservation Area and descend onto the iconic plains of the Serengeti. Afternoon game drive in the Seronera valley tracking lions, cheetahs, and leopards.",
        "accommodation": "Serengeti Heritage Camp / Osupuko Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Serengeti Game Drive to Ngorongoro Crater Rim",
        "activities": "Sunrise game drive in the Serengeti to observe morning predator activity. Return to camp for brunch, then drive across the highlands to Karatu for dinner and overnight.",
        "accommodation": "Marera Valley Lodge / Farm House Karatu",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Ngorongoro Crater Descent & Return to Arusha",
        "activities": "Descend into the 2,000ft caldera for an awe-inspiring safari tracking rhinos, lions, and hippos. Midday picnic lunch before driving back to Arusha for drop-off.",
        "accommodation": "N/A (Drop-off Arusha)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-fly-in-serengeti-ngorongoro-5-days",
    "name": "5-Day Fly-In Safari: Serengeti & Ngorongoro Crater",
    "category": "Safari",
    "duration": "5 Days",
    "priceRange": "$2,814",
    "fromPrice": 2814,
    "badge": "Fly-in Safari",
    "rates": [
      {
        "pax": "1 Person",
        "price": 3750,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 2814,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 2480,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1-650x400.jpg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg",
    "highlights": [
      "Fly directly into Central Serengeti to save hours of driving",
      "Three full days in Serengeti following the Great Migration",
      "Unsurpassed predator viewing on Serengeti rocky kopjes",
      "Full descent into the UNESCO Ngorongoro Crater",
      "Luxury tented wild camp and boutique highland lodge"
    ],
    "included": [
      "Return Domestic Flights (Zanzibar / Arusha / Serengeti / Nyerere)",
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Fly to Serengeti & First Afternoon Game Drive",
        "activities": "Board a morning flight straight into Serengeti National Park (Seronera). Meet your private safari guide and enjoy a scenic afternoon game drive among resident prides of lions and cheetahs before checking into your safari camp.",
        "accommodation": "Serengeti Heritage Luxury Tented Camp",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Full Day Central Serengeti Safari",
        "activities": "Full day game drive along the Seronera River valley and Moru Kopjes, home to rare black rhinos and leopard populations. Enjoy a bush picnic lunch overlooking the boundless savanna.",
        "accommodation": "Serengeti Heritage Luxury Tented Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Exploring the Great Migration Plains",
        "activities": "Traverse the open plains tracking large migration herds of wildebeest and zebra, observing predators and vulture circles. Evening sundowner around the campfire.",
        "accommodation": "Serengeti Heritage Luxury Tented Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Serengeti to Ngorongoro Highlands",
        "activities": "Morning game drive before leaving Serengeti. Drive through the Ngorongoro Conservation Area to Karatu in the highlands for dinner and overnight.",
        "accommodation": "Marera Valley Lodge / Farm House Karatu",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Ngorongoro Crater Descent & Return to Arusha",
        "activities": "Early morning descent into the crater floor for a 5-6 hour safari viewing black rhinos, lions, flamingos, and hippos. Ascend and drive back to Arusha for your evening flight.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-great-migration-5-days",
    "name": "5-Day Great Migration Safari: Serengeti & Ngorongoro",
    "category": "Safari",
    "duration": "5 Days",
    "priceRange": "$2,280",
    "fromPrice": 2280,
    "badge": "Great Migration",
    "rates": [
      {
        "pax": "1 Person",
        "price": 3150,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 2280,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1990,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-06-09-at-7.07.34-PM-3-650x400.jpeg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-06-09-at-7.07.34-PM-3.jpeg",
    "highlights": [
      "Follow the mega-herds of 1.5 million wildebeest and zebras",
      "Three nights in the heart of the Serengeti Migration path",
      "Dramatic predator chases by lions, leopards, and hyenas",
      "Descent into the prehistoric Ngorongoro Crater caldera",
      "Unforgettable sunsets over the African savannah"
    ],
    "included": [
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arusha to Central Serengeti National Park",
        "activities": "Depart Arusha early morning and travel through the Great Rift Valley and Ngorongoro Highlands, entering the Serengeti via Naabi Hill Gate. Afternoon game drive in the Seronera Valley.",
        "accommodation": "Serengeti Safari Camp / Osupuko Camp",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Tracking the Great Migration (Central & Western/Northern)",
        "activities": "Follow the migration corridors where thousands of wildebeests gather. Witness intense interactions between predators and prey. Enjoy a bush lunch under an acacia canopy.",
        "accommodation": "Serengeti Safari Camp / Osupuko Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Full Day Serengeti Safari & Kopjes Search",
        "activities": "Dedicate another full day to exploring kopjes for lounging lion prides and scanning riverbanks for leopards. Watch hippos wallowing and plains game grazing peacefully.",
        "accommodation": "Serengeti Safari Camp / Osupuko Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Serengeti to Ngorongoro Crater Rim",
        "activities": "Morning game drive exiting Serengeti toward the crater highlands. Arrive at your lodge in Karatu for an evening of relaxation and dinner.",
        "accommodation": "Marera Valley Lodge / Eileen’s Trees Inn",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Ngorongoro Crater Exploration & Return to Arusha",
        "activities": "Descend 600m to the crater floor for a 6-hour safari. Spot endangered black rhinos, elephant bulls, and flamingos. Return to Arusha by late afternoon.",
        "accommodation": "N/A (Drop-off Arusha)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-ndutu-calving-5-days",
    "name": "5-Day Ndutu Calving Season Safari: Serengeti & Ngorongoro",
    "category": "Safari",
    "duration": "5 Days",
    "priceRange": "$2,529",
    "fromPrice": 2529,
    "badge": "Calving Season",
    "rates": [
      {
        "pax": "1 Person",
        "price": 3400,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 2529,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 2190,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-06-11-at-1.54.40-PM-1-650x400.jpeg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-06-11-at-1.54.40-PM-1.jpeg",
    "highlights": [
      "Peak calving season experience on Southern Serengeti / Ndutu plains",
      "Watch thousands of calves born every day during January to March",
      "High cheetah and lion action as predators stalk the nursery herds",
      "Descent into the UNESCO Ngorongoro Crater",
      "Intimate wilderness lodge accommodations"
    ],
    "included": [
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arusha to Ndutu Plains",
        "activities": "Depart Arusha and drive through Ngorongoro highlands directly to the Ndutu calving plains. Enjoy an afternoon game drive exploring the nursery herds and resident big cats.",
        "accommodation": "Ndutu Safari Lodge / Kenzan Ndutu Camp",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Full Day in the Ndutu Migration Heartland",
        "activities": "Full day observing calving spectacles across the nutrient-rich volcanic short-grass plains. Watch cheetah hunts and hyena clans interacting with the herds.",
        "accommodation": "Ndutu Safari Lodge / Kenzan Ndutu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "South Serengeti & Lake Ndutu Exploration",
        "activities": "Explore marshlands, acacia woodlands, and Lake Ndutu shores where thousands of flamingos feed. Spot servals, caracals, and large lion prides.",
        "accommodation": "Ndutu Safari Lodge / Kenzan Ndutu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Ndutu to Ngorongoro Highlands",
        "activities": "Morning game drive before travelling across the Ngorongoro Conservation Area to Karatu in the highlands for dinner and relaxation.",
        "accommodation": "Marera Valley Lodge / Farm House Karatu",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Ngorongoro Crater Descent & Return to Arusha",
        "activities": "Descend early into the crater caldera for a full wildlife safari. Spot black rhinos, lions, and hippos before returning to Arusha in the late afternoon.",
        "accommodation": "N/A (Drop-off Arusha)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-serengeti-crater-tarangire-5-days",
    "name": "5-Day Tanzania Safari: Tarangire, Serengeti & Ngorongoro",
    "category": "Safari",
    "duration": "5 Days",
    "priceRange": "$2,614",
    "fromPrice": 2614,
    "badge": "Best Seller",
    "rates": [
      {
        "pax": "1 Person",
        "price": 3550,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 2614,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 2250,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1-650x400.jpg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/08/Tarangire-Ngorongoro-Serengeti-Safari-1.jpg",
    "highlights": [
      "Comprehensive 5-day Northern Circuit itinerary",
      "Giant elephant herds and baobab trees of Tarangire",
      "Two full nights in the world-famous Serengeti National Park",
      "Descent into the UNESCO World Heritage Ngorongoro Crater",
      "Charming safari lodge and tented camp stays"
    ],
    "included": [
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arusha to Tarangire National Park",
        "activities": "Depart Arusha after breakfast for Tarangire National Park. Enjoy an extensive game drive along the Tarangire River observing massive elephant herds, lions, zebras, and giraffes.",
        "accommodation": "Eileen’s Trees Inn / Highview Hotel",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Tarangire to Central Serengeti National Park",
        "activities": "Travel up through Ngorongoro Conservation Area and descend onto the endless plains of the Serengeti. Afternoon game drive in the Seronera valley.",
        "accommodation": "Serengeti Safari Camp / Osupuko Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Full Day Wildlife Safari in Serengeti",
        "activities": "Full day game drive tracking big cats, following migration movements, and visiting the Retina Hippo Pool. Enjoy a picnic lunch under the African sun.",
        "accommodation": "Serengeti Safari Camp / Osupuko Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Serengeti to Ngorongoro Highlands",
        "activities": "Sunrise game drive in the Serengeti before driving to the Karatu highlands overlooking the crater rim. Relax and enjoy dinner at the lodge.",
        "accommodation": "Marera Valley Lodge / Farm House Karatu",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Ngorongoro Crater Descent & Return to Arusha",
        "activities": "Descend 600m onto the crater floor for an unforgettable morning safari spotting the Big Five, including black rhinos. Return to Arusha by late afternoon.",
        "accommodation": "N/A (Drop-off Arusha)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-luxury-ndutu-6-days",
    "name": "6-Day Luxury Ndutu Safari: Calving Season & Ngorongoro",
    "category": "Safari",
    "duration": "6 Days",
    "priceRange": "$5,644",
    "fromPrice": 5644,
    "badge": "Luxury Calving",
    "rates": [
      {
        "pax": "1 Person",
        "price": 7200,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 5644,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 4900,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-06-11-at-1.54.37-PM-650x400.jpeg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-06-11-at-1.54.37-PM.jpeg",
    "highlights": [
      "Ultra-luxury tented camp accommodation right in the Ndutu calving sector",
      "Three full days tracking wildebeest births and apex predator hunting",
      "Exclusive private game drives with top-tier naturalist guide",
      "Descent into the Ngorongoro Crater with gourmet bush lunch",
      "Premium wines, spirits, and personalized luxury hospitality"
    ],
    "included": [
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arusha to Tarangire National Park",
        "activities": "Depart Arusha in your private luxury vehicle for Tarangire National Park. Enjoy a tranquil game drive exploring baobabs and elephant herds before heading to your luxury lodge.",
        "accommodation": "Tarangire Safari Lodge / Marera Valley Lodge",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Journey to Ndutu Calving Heartland",
        "activities": "Drive into the Southern Serengeti Ndutu plains. Check in to your luxury tented camp situated directly in the path of the migration and enjoy an afternoon game drive.",
        "accommodation": "Ndutu Luxury Tented Camp / Sanctuary Kusini",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Full Day Luxury Calving Safari in Ndutu",
        "activities": "Full day roaming the plains to witness wildebeest calving, predator hunts, and expansive herds. Return to camp for five-star dining and campfire cocktails.",
        "accommodation": "Ndutu Luxury Tented Camp / Sanctuary Kusini",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Second Full Day in Ndutu Plains",
        "activities": "Track cheetahs on the open savanna, visit Lake Masek, and explore hidden woodland thickets for leopards and tree-climbing lions. Gourmet bush picnic.",
        "accommodation": "Ndutu Luxury Tented Camp / Sanctuary Kusini",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Ndutu to Ngorongoro Crater Rim",
        "activities": "Morning game drive before travelling across the Ngorongoro Conservation Area to an exclusive luxury lodge overlooking the crater rim.",
        "accommodation": "Ngorongoro Crater Lodge / Neptune Ngorongoro",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Ngorongoro Crater Descent & Return to Arusha",
        "activities": "Private early morning descent to the crater floor. Enjoy unmatched viewing of black rhinos, lions, and flamingos before your transfer back to Arusha.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "safari-56-ndutu-calving-6-days",
    "name": "6-Day Ndutu Calving Season Safari: Serengeti & Ngorongoro",
    "category": "Safari",
    "duration": "6 Days",
    "priceRange": "$3,319",
    "fromPrice": 3319,
    "badge": "Calving Season",
    "rates": [
      {
        "pax": "1 Person",
        "price": 4400,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 3319,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 2900,
        "currency": "$"
      }
    ],
    "image": "https://safari56.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-06-11-at-1.54.37-PM-650x400.jpeg",
    "coverImage": "https://safari56.com/wp-content/uploads/2026/10/WhatsApp-Image-2025-06-11-at-1.54.37-PM.jpeg",
    "highlights": [
      "Comprehensive 6-day immersion in Tarangire, Ndutu & Ngorongoro",
      "Three full days in Ndutu during the wildebeest calving peak",
      "Highest concentration of predators in Africa during migration season",
      "Descent into the spectacular Ngorongoro Crater",
      "Comfortable safari camps situated right in the migration action"
    ],
    "included": [
      "Private 4×4 Safari Land Cruiser with pop-up roof",
      "Professional English-speaking Safari Guide",
      "Park Entrance Fees and Government Taxes",
      "Comfortable Safari Lodges & Camps",
      "All Meals During Safari",
      "Bottled Drinking Water Throughout Safari",
      "Unlimited Game Drives",
      "Guide Tip (Included by Safari 56)",
      "Airport pick-up and drop-off (Included by Safari 56)",
      "Travel Insurance (Included by Safari 56)"
    ],
    "notIncluded": [
      "International Flights",
      "Visa Fees",
      "Personal Expenses",
      "Alcoholic Drinks",
      "Optional Activities"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Arusha to Tarangire National Park",
        "activities": "Morning departure from Arusha to Tarangire National Park. Enjoy an extensive game drive spotting large elephant families, lions, and giraffes before heading to your lodge.",
        "accommodation": "Eileen’s Trees Inn / Highview Hotel",
        "meals": "Lunch, Dinner"
      },
      {
        "day": 2,
        "title": "Tarangire to Ndutu Calving Grounds",
        "activities": "Drive through Ngorongoro into the southern Serengeti Ndutu plains. Afternoon game drive among the calving wildebeest herds and cheetahs.",
        "accommodation": "Ndutu Safari Lodge / Kenzan Ndutu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 3,
        "title": "Full Day in Ndutu Plains",
        "activities": "Full day observing the calving spectacle on the short-grass plains. Watch calves standing within minutes of birth and predators stalking the nursery herds.",
        "accommodation": "Ndutu Safari Lodge / Kenzan Ndutu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 4,
        "title": "Lake Ndutu & Southern Serengeti Exploration",
        "activities": "Explore Lake Ndutu and Lake Masek soda shores, acacia woodlands, and tracking lions, leopards, and hyenas. Midday bush picnic lunch.",
        "accommodation": "Ndutu Safari Lodge / Kenzan Ndutu Camp",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 5,
        "title": "Ndutu to Karatu Highlands",
        "activities": "Morning game drive before ascending into the Ngorongoro Conservation Area to Karatu in the highlands for dinner and relaxation.",
        "accommodation": "Marera Valley Lodge / Farm House Karatu",
        "meals": "Breakfast, Lunch, Dinner"
      },
      {
        "day": 6,
        "title": "Ngorongoro Crater Descent & Return to Arusha",
        "activities": "Early morning descent into the crater caldera for a 6-hour safari. Spot black rhinos, lions, and hippos before driving back to Arusha for your evening flight.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast, Lunch"
      }
    ]
  },
  {
    "id": "zanzibar-stone-town-2-days",
    "name": "Stone Town Zanzibar",
    "category": "Zanzibar",
    "duration": "2 Days",
    "priceRange": "$45",
    "fromPrice": 45,
    "badge": "Stone Town Heritage",
    "rates": [
      {
        "pax": "1 Person",
        "price": 131,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 45,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 25,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 8,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg",
    "highlights": [
      "Explore the UNESCO World Heritage Site of historic Stone Town",
      "Walk through labyrinthine alleys, historic carved doors, and local bazaars",
      "Visit the Sultan’s Palace, House of Wonders, and the Old Fort",
      "Discover the emotional Former Slave Market site and Anglican Cathedral",
      "Comfortable stay in authentic boutique Stone Town heritage hotel"
    ],
    "included": [
      "All airport and ferry port transfers in private air-conditioned vehicle",
      "Accommodation in selected hotel / beach resort as per itinerary",
      "Meals as specified in the itinerary (Breakfast, Lunch, Dinner)",
      "All guided tours, boat trips, and marine reserve fees (Stone Town, Prison Island, Spice Tour, etc.)",
      "All government taxes and Zanzibar tourism levies",
      "Professional licensed English-speaking local tour guide",
      "Bottled drinking water during tours and transfers"
    ],
    "notIncluded": [
      "International and domestic flights to/from Zanzibar",
      "Tanzania tourist entry visa",
      "Travel, medical, and cancellation insurance",
      "Tips and gratuities for guides, boat crew, and hotel staff",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Optional motorized water sports, diving courses, and extra excursions"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival in Zanzibar",
        "activities": "Upon arriving at Zanzibar Airport, you’ll be warmly welcomed and transferred to Stone Town for check-in at the Tembo House Hotel or a similar accommodation. After settling in, enjoy a peaceful sail on a traditional wooden dhow to Prison Island, a place rich in history and natural beauty. Explore the island, learn about its past, and take in the beautiful scenery. In the evening, return to your hotel for an overnight stay. Accommodations will be at Tembo House Hotel, and breakfast is included in your stay (Bed & Breakfast).\n\nOvernight:Tembo House Hotel or Similar",
        "accommodation": "Tembo House Hotel / Dhow Palace (Stone Town)",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Day 2: Stone Town Tour & Departure",
        "activities": "After a hearty breakfast, you will be picked up for a half-day tour of Stone Town, a UNESCO World Heritage site. This tour allows you to immerse yourself in the town's rich history and vibrant culture as you explore its winding streets, bustling markets, and historical sites such as the Old Fort and House of Wonders. You will also have the opportunity to shop for unique souvenirs, spices, and local crafts. Following the tour, you will be transferred back to your hotel to collect your belongings before heading to the airport for your onward flight, wrapping up your unforgettable Zanzibar experience.\n\nNote: Depending on your arrival and departure times, you may have the option to add 1 or 2 excursions on both days to enhance your experience. Our team can assist with customizing your itinerary to ensure you make the most of your time in Zanzibar.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ],
    "subcategory": "Multi-Day Holidays",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/photo0jpg-1024x768.jpg"
  },
  {
    "id": "zanzibar-prison-island-3-days",
    "name": "Prison Island Tour",
    "category": "Zanzibar",
    "duration": "3 Days",
    "priceRange": "$243",
    "fromPrice": 243,
    "badge": "Island & Giant Tortoises",
    "rates": [
      {
        "pax": "1 Person",
        "price": 398,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 243,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 208,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 177,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-island-1024x683.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-island-1024x683.jpg",
    "highlights": [
      "Traditional wooden dhow boat ride across azure waters to Changuu (Prison Island)",
      "Encounter and hand-feed giant Aldabra tortoises (some over 150 years old)",
      "Snorkel along colorful coral reefs teeming with tropical starfish and marine life",
      "Aromatic guided walking tour of an authentic Zanzibar spice plantation",
      "Guided historical walking tour through the timeless alleys of Stone Town"
    ],
    "included": [
      "All airport and ferry port transfers in private air-conditioned vehicle",
      "Accommodation in selected hotel / beach resort as per itinerary",
      "Meals as specified in the itinerary (Breakfast, Lunch, Dinner)",
      "All guided tours, boat trips, and marine reserve fees (Stone Town, Prison Island, Spice Tour, etc.)",
      "All government taxes and Zanzibar tourism levies",
      "Professional licensed English-speaking local tour guide",
      "Bottled drinking water during tours and transfers"
    ],
    "notIncluded": [
      "International and domestic flights to/from Zanzibar",
      "Tanzania tourist entry visa",
      "Travel, medical, and cancellation insurance",
      "Tips and gratuities for guides, boat crew, and hotel staff",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Optional motorized water sports, diving courses, and extra excursions"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival in Zanzibar",
        "activities": "Upon arrival at Zanzibar Airport, you'll be warmly welcomed and transferred to Stone Town, just a 20-minute drive away. After checking in at Tembo House Hotel or a similar accommodation, you’ll have free time to relax and explore. Stone Town, a UNESCO World Heritage site, is renowned for its rich history and unique blend of Swahili, Arab, and European influences.\n\nWander through its narrow, winding streets, admire the intricately carved doors, and experience the vibrant markets and historic landmarks. Enjoy the charm and cultural depth of this fascinating town. Your overnight stay includes breakfast, setting you up perfectly for the days ahead.\n\nOvernight: Tembo House Hotel or similar (Dinner + Bed + Breakfast)",
        "accommodation": "Tembo House Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Day 2: Spice Farm & Prison Island Tour",
        "activities": "Start your day with breakfast before heading to a Spice Farm for an engaging tour. Discover the cultivation, uses, and cultural significance of various spices, many of which play a role in local medicine and cosmetics. Enjoy a delicious lunch at the farm before returning to your hotel. In the afternoon, embark on a traditional dhow cruise to Prison Island. Explore the island’s fascinating history, encounter the giant tortoises that have lived for over 120 years, and enjoy swimming and snorkeling in its crystal-clear waters. Return to your hotel for an overnight stay with breakfast included, soaking in the day’s memorable experiences.\n\nOvernight: Tembo House Hotel or similar (Dinner + Bed + Breakfast)",
        "accommodation": "Tembo House Hotel / Maru Maru",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 3,
        "title": "Day 3: Stone Town Tour & Departure",
        "activities": "After breakfast, enjoy a half-day tour of Stone Town, exploring its historical sites and vibrant markets. You’ll also have time for shopping and a lunch of your choice. Following the tour, transfer to the airport for your departure flight. This package offers a perfect balance of cultural exploration and relaxation.\n\nNote: Depending on your departure time, there may be options to add 1 or 2 additional excursions before transferring to the port or airport. Our team is available to help customize your itinerary to make the most of your Zanzibar experience.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ],
    "subcategory": "Multi-Day Holidays",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/zanzibar-beach-view-1024x576.jpg"
  },
  {
    "id": "zanzibar-jozani-forest-4-days",
    "name": "Zanzibar Tour Jozani",
    "category": "Zanzibar",
    "duration": "4 Days",
    "priceRange": "$444",
    "fromPrice": 444,
    "badge": "Spices & Red Colobus",
    "rates": [
      {
        "pax": "1 Person",
        "price": 669,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 444,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 392,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 347,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/photo0jpg-1024x768.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/photo0jpg-1024x768.jpg",
    "highlights": [
      "Trek through Jozani Chwaka Bay National Park, Zanzibar’s only national park",
      "Spot the rare, endemic Zanzibar Red Colobus monkeys in their natural canopy",
      "Walk elevated wooden boardwalks through ancient mangrove swamp ecosystems",
      "Smell, touch, and taste fresh cloves, nutmeg, vanilla, and cinnamon at a spice farm",
      "Relaxation time on Zanzibar’s world-renowned powdery white sand beaches"
    ],
    "included": [
      "All airport and ferry port transfers in private air-conditioned vehicle",
      "Accommodation in selected hotel / beach resort as per itinerary",
      "Meals as specified in the itinerary (Breakfast, Lunch, Dinner)",
      "All guided tours, boat trips, and marine reserve fees (Stone Town, Prison Island, Spice Tour, etc.)",
      "All government taxes and Zanzibar tourism levies",
      "Professional licensed English-speaking local tour guide",
      "Bottled drinking water during tours and transfers"
    ],
    "notIncluded": [
      "International and domestic flights to/from Zanzibar",
      "Tanzania tourist entry visa",
      "Travel, medical, and cancellation insurance",
      "Tips and gratuities for guides, boat crew, and hotel staff",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Optional motorized water sports, diving courses, and extra excursions"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival in Zanzibar",
        "activities": "Upon arrival at Zanzibar Airport, you will be warmly greeted and transferred to Paje Village on the southeast coast, a journey of approximately one hour. After checking in at Mahali Zanzibar or a similar hotel, you'll have the rest of the day to unwind and enjoy the tranquil surroundings. Paje Village is known for its stunning beaches and vibrant local culture. Spend your time relaxing on the sandy shores, exploring the local area, or simply soaking in the serene coastal ambiance. Your overnight stay includes breakfast, providing a delightful start to your Zanzibar experience.\n\nOvernight: Mahali Zanzibar or similar hotel (Bed & Breakfast)",
        "accommodation": "Tembo House Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Day 2: Jozani Forest & Spice Tour",
        "activities": "After enjoying breakfast at your hotel, embark on a scenic drive to Jozani Forest, home to the unique red colobus monkeys, a species endemic to Zanzibar. These charming primates are often seen roaming freely and are highly photogenic, making for a memorable wildlife encounter. Following your visit to the forest, head to a local spice plantation for an enlightening spice tour. Discover the cultivation and uses of various spices, many of which are integral to local cuisine, medicine, and cosmetics. Enjoy a traditional lunch at the spice farm before returning to your hotel. Your overnight stay includes breakfast, allowing you to rest comfortably after a day of exploration.\n\nOvernight: Mahali Zanzibar or similar hotel (Bed & Breakfast)",
        "accommodation": "Mahali Zanzibar / Karafuu Beach Resort",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 3,
        "title": "Day 3: Leisure and Relaxation",
        "activities": "After a leisurely breakfast at your hotel, enjoy a full day of free time to relax and soak up the coastal charm of Paje Village. This area is renowned for its stunning beaches and excellent opportunities for kitesurfing, which can be arranged directly through your hotel. Spend your day lounging on the pristine sands, swimming in the clear waters, or engaging in exciting water sports. The serene setting of Paje Village offers a perfect escape for relaxation or adventure. Your overnight stay includes breakfast, ensuring you have a comfortable and refreshing end to your day.\n\nOvernight: Mahali Zanzibar or similar hotel (Bed & Breakfast)",
        "accommodation": "Mahali Zanzibar",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 4,
        "title": "Day 4: Departure",
        "activities": "After a hearty breakfast at your hotel, you'll have a final opportunity to relax or enjoy the last moments of your time in Paje Village. When the time comes, you'll be transferred to Zanzibar International Airport, approximately an hour away, for your onward flight. This convenient transfer ensures you reach the airport with ample time for your departure, bringing your memorable Zanzibar experience to a smooth and pleasant end.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ],
    "subcategory": "Multi-Day Holidays",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/mahali-zanzibar-1024x683.jpg"
  },
  {
    "id": "zanzibar-prison-island-spice-4-days",
    "name": "Prison Island & Spice Tour",
    "category": "Zanzibar",
    "duration": "4 Days",
    "priceRange": "$467",
    "fromPrice": 467,
    "badge": "Island & Spice Tour",
    "rates": [
      {
        "pax": "1 Person",
        "price": 700,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 467,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 414,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 367,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/mahali-zanzibar-1024x683.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/mahali-zanzibar-1024x683.jpg",
    "highlights": [
      "Visit Prison Island to meet Aldabra giant tortoises and explore historical ruins",
      "Snorkel crystal-clear turquoise waters along pristine coastal reefs",
      "Sensory journey through organic spice farms learning traditional island herbal remedies",
      "Leisurely days soaking in tropical sunshine on palm-fringed eastern coastlines",
      "Stone Town architectural exploration and vibrant evening Forodhani food market"
    ],
    "included": [
      "All airport and ferry port transfers in private air-conditioned vehicle",
      "Accommodation in selected hotel / beach resort as per itinerary",
      "Meals as specified in the itinerary (Breakfast, Lunch, Dinner)",
      "All guided tours, boat trips, and marine reserve fees (Stone Town, Prison Island, Spice Tour, etc.)",
      "All government taxes and Zanzibar tourism levies",
      "Professional licensed English-speaking local tour guide",
      "Bottled drinking water during tours and transfers"
    ],
    "notIncluded": [
      "International and domestic flights to/from Zanzibar",
      "Tanzania tourist entry visa",
      "Travel, medical, and cancellation insurance",
      "Tips and gratuities for guides, boat crew, and hotel staff",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Optional motorized water sports, diving courses, and extra excursions"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival in Zanzibar",
        "activities": "Upon arrival at Zanzibar Airport, you will be warmly greeted and transferred to your hotel on the southeast coast, a journey of approximately 60 minutes. After checking in at Mahali Zanzibar, Zula Zanzibar, or a similar hotel, you’ll have the rest of the day to unwind and enjoy the stunning beach surroundings. The southeast coast is renowned for its beautiful beaches and serene coastal ambiance. Relax on the sandy shores, explore the local area, or simply soak in the tranquil environment. Your overnight stay includes breakfast, ensuring a delightful start to your Zanzibar experience.\n\nOvernight: Mahali Zanzibar or similar hotel (Bed & Breakfast)",
        "accommodation": "Tembo House Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Day 2: Jozani Forest & Spice Tour",
        "activities": "After enjoying breakfast at your hotel, embark on a scenic drive to Jozani Forest, home to the unique red colobus monkeys, a species endemic to Zanzibar. These charming primates are often seen roaming freely and are highly photogenic, making for a memorable wildlife encounter. Following your visit to the forest, head to a local spice plantation for an enlightening spice tour. Discover the cultivation and uses of various spices, many of which are integral to regional cuisine, medicine, and cosmetics. Enjoy a traditional lunch at the spice farm before returning to your hotel. Your overnight stay includes breakfast, allowing you to rest comfortably after a day of exploration.\n\nOvernight: Mahali Zanzibar or similar hotel (Bed & Breakfast)",
        "accommodation": "Mahali Zanzibar Beach Resort",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 3,
        "title": "Day 3: Leisure and Relaxation",
        "activities": "After a leisurely breakfast at your hotel, enjoy a full day of free time to relax and soak up the coastal charm of Paje Village. This area is renowned for its stunning beaches and excellent opportunities for kitesurfing, which can be arranged directly through your hotel. Spend your day lounging on the pristine sands, swimming in the clear waters, or engaging in exciting water sports. The serene setting of Paje Village offers a perfect escape for relaxation or adventure. Your overnight stay includes breakfast, ensuring you have a comfortable and refreshing end to your day.\n\nOvernight: Mahali Zanzibar or similar hotel (Bed & Breakfast)",
        "accommodation": "Mahali Zanzibar",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 4,
        "title": "Day 4: Departure",
        "activities": "After a hearty breakfast at your hotel, you'll have a final opportunity to relax or enjoy the last moments of your time in Paje Village. When the time comes, you'll be transferred to Zanzibar International Airport, approximately an hour away, for your onward flight. This convenient transfer ensures you reach the airport with ample time for your departure, bringing your memorable Zanzibar experience to a smooth and pleasant end.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ],
    "subcategory": "Multi-Day Holidays",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/img-20180208-wa0000-largejpg.jpg"
  },
  {
    "id": "zanzibar-kuza-cave-4-days",
    "name": "Kuza Cave Tour",
    "category": "Zanzibar",
    "duration": "4 Days",
    "priceRange": "$467",
    "fromPrice": 467,
    "badge": "Cave & Nature",
    "rates": [
      {
        "pax": "1 Person",
        "price": 700,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 467,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 414,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 367,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/kuza-cave.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/kuza-cave.jpg",
    "highlights": [
      "Swim in the crystal-clear sacred freshwater subterranean pool of Kuza Cave in Jambiani",
      "Experience traditional Swahili drumming, dancing, and cultural storytelling",
      "Track red colobus monkeys through the lush mahogany stands of Jozani Forest",
      "Relax on peaceful southeast coast beaches with tranquil turquoise waters",
      "Full day of tropical leisure and beachside cocktail dining"
    ],
    "included": [
      "All airport and ferry port transfers in private air-conditioned vehicle",
      "Accommodation in selected hotel / beach resort as per itinerary",
      "Meals as specified in the itinerary (Breakfast, Lunch, Dinner)",
      "All guided tours, boat trips, and marine reserve fees (Stone Town, Prison Island, Spice Tour, etc.)",
      "All government taxes and Zanzibar tourism levies",
      "Professional licensed English-speaking local tour guide",
      "Bottled drinking water during tours and transfers"
    ],
    "notIncluded": [
      "International and domestic flights to/from Zanzibar",
      "Tanzania tourist entry visa",
      "Travel, medical, and cancellation insurance",
      "Tips and gratuities for guides, boat crew, and hotel staff",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Optional motorized water sports, diving courses, and extra excursions"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival in Zanzibar",
        "activities": "Upon arrival at Zanzibar Airport, you will be warmly greeted and transferred to your hotel on the southeast coast, a journey of approximately 60 minutes. After checking in at Mahali Zanzibar, Zula Zanzibar, or a similar hotel, you’ll have the rest of the day to unwind and enjoy the stunning beach surroundings.\n\nThe southeast coast is renowned for its beautiful beaches and serene coastal ambiance. Relax on the sandy shores, explore the local area, or simply soak in the tranquil environment. Your overnight stay includes breakfast, ensuring a delightful start to your Zanzibar experience.\n\nOvernight: Mahali Zanzibar or similar hotel (Bed & Breakfast)",
        "accommodation": "Tembo House Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Day 2: Jozani Forest & Kuza Cave",
        "activities": "After breakfast, head to Jozani Forest for an exciting encounter with the red colobus monkeys, an endemic species renowned for their distinctive character. You’ll have the chance to observe them up close and capture memorable photos of these fascinating primates.\n\nNext, explore Kuza Cave, an ancient cave with crystal-clear water, where you can enjoy a refreshing swim and explore its stunning natural features. To add a cultural touch to your day, experience a vibrant native dance performance. After a day full of adventure and cultural enrichment, return to your hotel for a relaxing evening.\n\nOvernight: Mahali Zanzibar or similar hotel (Bed & Breakfast)",
        "accommodation": "Blue Oyster Hotel / Coral Rock (Jambiani)",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 3,
        "title": "Day 3: Leisure and Relaxation",
        "activities": "Start your day with a delicious breakfast at the hotel and then spend the entire day enjoying the serene beach and swimming in the Indian Ocean. Bask in the sun, unwind on the white sandy shores, or take a refreshing dip in the clear waters. With plenty of time to relax and savor the tranquil surroundings, you can enjoy the beach at your own pace.\n\nWhether you choose to lounge by the pool or explore the coastline, this day is designed for ultimate relaxation and leisure. Return to the hotel in the evening for dinner and another restful night’s stay.\n\nOvernight: Mahali Zanzibar or similar hotel (Bed & Breakfast)",
        "accommodation": "Blue Oyster Hotel",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 4,
        "title": "Day 4: Departure",
        "activities": "After a hearty breakfast at your hotel, you'll have a final opportunity to relax or enjoy the last moments of your time in Paje Village. When the time comes, you'll be transferred to Zanzibar International Airport, approximately an hour away, for your onward flight.\n\nThis convenient transfer ensures you reach the airport with ample time for your departure, bringing your memorable Zanzibar experience to a smooth and pleasant end.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ],
    "subcategory": "Multi-Day Holidays",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/zanzibar-airport-1024x503.jpg"
  },
  {
    "id": "zanzibar-fukuchani-5-days",
    "name": "Zanzibar Fukuchani Tour",
    "category": "Zanzibar",
    "duration": "5 Days",
    "priceRange": "$737",
    "fromPrice": 737,
    "badge": "Ruins & Aquarium",
    "rates": [
      {
        "pax": "1 Person",
        "price": 1065,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 737,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 662,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 596,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Zanzibar-Fukuchani-Tour.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Zanzibar-Fukuchani-Tour.jpg",
    "highlights": [
      "Swim with sea turtles in the natural tidal lagoon aquarium at Nungwi / Fukuchani",
      "Explore ancient 16th-century Portuguese ruins and mysterious limestone caves",
      "Snorkeling and dolphin watching excursion around the legendary Mnemba Atoll reef",
      "Powdery white sand beaches and dramatic Indian Ocean sunsets",
      "Full days of tropical oceanfront relaxation with ocean breeze"
    ],
    "included": [
      "All airport and ferry port transfers in private air-conditioned vehicle",
      "Accommodation in selected hotel / beach resort as per itinerary",
      "Meals as specified in the itinerary (Breakfast, Lunch, Dinner)",
      "All guided tours, boat trips, and marine reserve fees (Stone Town, Prison Island, Spice Tour, etc.)",
      "All government taxes and Zanzibar tourism levies",
      "Professional licensed English-speaking local tour guide",
      "Bottled drinking water during tours and transfers"
    ],
    "notIncluded": [
      "International and domestic flights to/from Zanzibar",
      "Tanzania tourist entry visa",
      "Travel, medical, and cancellation insurance",
      "Tips and gratuities for guides, boat crew, and hotel staff",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Optional motorized water sports, diving courses, and extra excursions"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival in Zanzibar",
        "activities": "After landing at Zanzibar Airport, you will be warmly greeted and transferred to the scenic north coast of Zanzibar. The 60-minute drive takes you to your accommodation at Sunset Kendwa or a similar hotel, located on one of the island’s most tranquil and secluded beaches. Upon arrival, settle in and relax, enjoying the peaceful atmosphere and beautiful surroundings. Whether you choose to lounge by the beach or simply unwind, the serene environment sets the tone for your stay. Your overnight stay includes breakfast, ensuring a comfortable and rejuvenating start to your Zanzibar adventure.\n\nOvernight: Sunset Kendwa or similar hotel (Bed & Breakfast)",
        "accommodation": "Tembo House Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Day 2: Snorkeling and Dolphin Adventure at Mnemba Atoll",
        "activities": "After breakfast, embark on an exciting snorkeling adventure at Muyuni Beach. A boat will take you to Mnemba Atoll's dolphin site, offering a rare opportunity to swim and play with dolphins in their natural habitat. Afterward, continue to Mnemba Island, known for its vibrant marine life, where you can snorkel and explore the underwater beauty. Conclude the trip with refreshments and drinks on a nearby Sandbank before heading back to the hotel. Relax and enjoy the rest of your evening, taking in the serene surroundings after a day full of adventure and unforgettable experiences.\n\nOvernight: Sunset Kendwa or similar hotel (Bed & Breakfast)",
        "accommodation": "Zanzibar Queen Hotel / Sandies Baobab",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 3,
        "title": "Day 3: Fukuchani Cave, Mvuleni Ruins & Natural Aquarium Tour",
        "activities": "After breakfast, immerse yourself in a day filled with culture and nature. Begin with a visit to Mvuleni Village to explore the historic Fukuchani Cave and Mvuleni Ruins. Take a refreshing swim in the natural lagoon within the cave and enjoy a short tour of the village, gaining insights into local traditions. Later, head to Nungwi to visit the natural aquarium, home to sea turtles and diverse marine life. After a day of exploration and wildlife encounters, return to your hotel for a relaxing and peaceful night, reflecting on the day’s enriching experiences.\n\nOvernight: Sunset Kendwa or similar hotel (Bed & Breakfast)",
        "accommodation": "Zanzibar Queen Hotel",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 4,
        "title": "Day 4: Full Day of Leisure",
        "activities": "Spend the day at your own pace, taking full advantage of the resort’s many offerings and the mesmerizing beauty of the Indian Ocean. Relax on the pristine sandy beach or enjoy a refreshing swim in the clear, turquoise waters. For those seeking more activity, the resort offers various options such as watersports or a peaceful walk along the shoreline. Whether you choose to bask in the sun, savor the local scenery, or simply unwind in the resort’s tranquil setting, this day of leisure provides the perfect opportunity to recharge and fully embrace the serene ambiance of Zanzibar.\n\nOvernight: Sunset Kendwa or similar hotel (Bed & Breakfast)",
        "accommodation": "Zanzibar Queen Hotel",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 5,
        "title": "Day 5: Departure",
        "activities": "After a final, relaxed breakfast at the hotel, enjoy some leisure time to take in the last moments of your Zanzibar escape. Whether you opt for a quiet stroll along the beach or a final dip in the Indian Ocean, make the most of this peaceful morning. Once you are ready, you will be transferred to Zanzibar Airport in time for your departure flight. As your journey comes to an end, you'll leave with lasting memories of your unforgettable Zanzibar experience, filled with relaxation, adventure, and the beauty of this exotic island.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ],
    "subcategory": "Multi-Day Holidays",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/photo0jpg-1024x768.jpg"
  },
  {
    "id": "zanzibar-matemwe-5-days",
    "name": "Zanzibar Matemwe Tour",
    "category": "Zanzibar",
    "duration": "5 Days",
    "priceRange": "$743",
    "fromPrice": 743,
    "badge": "Ocean View Relaxation",
    "rates": [
      {
        "pax": "1 Person",
        "price": 1073,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 743,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 668,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 602,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/suite-double-ocean-view-1024x684.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/suite-double-ocean-view-1024x684.jpg",
    "highlights": [
      "Boutique beachfront accommodation in peaceful Matemwe facing Mnemba Island",
      "Spectacular views over the turquoise lagoon with traditional dhows sailing past",
      "Optional diving and snorkeling at the world-class Mnemba coral reef",
      "Rejuvenating beach walks, oceanfront pool relaxation, and fresh seafood dining",
      "Comprehensive guided walking tour through historic Stone Town"
    ],
    "included": [
      "All airport and ferry port transfers in private air-conditioned vehicle",
      "Accommodation in selected hotel / beach resort as per itinerary",
      "Meals as specified in the itinerary (Breakfast, Lunch, Dinner)",
      "All guided tours, boat trips, and marine reserve fees (Stone Town, Prison Island, Spice Tour, etc.)",
      "All government taxes and Zanzibar tourism levies",
      "Professional licensed English-speaking local tour guide",
      "Bottled drinking water during tours and transfers"
    ],
    "notIncluded": [
      "International and domestic flights to/from Zanzibar",
      "Tanzania tourist entry visa",
      "Travel, medical, and cancellation insurance",
      "Tips and gratuities for guides, boat crew, and hotel staff",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Optional motorized water sports, diving courses, and extra excursions"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival in Zanzibar",
        "activities": "Upon your arrival at Zanzibar Airport, you will be warmly greeted and transferred to Zanzibar Queen Hotel, a peaceful retreat located on the northeast coast, approximately a 1-hour and 20-minute drive from the airport. After settling into your room, the remainder of the day is yours to relax and unwind in the tranquil surroundings. Whether you choose to lounge by the beach or simply enjoy the resort's peaceful atmosphere, your stay promises relaxation. Your overnight accommodation includes both dinner and breakfast, ensuring a restful start to your Zanzibar getaway.\n\nOvernight: Zanzibar Queen Hotel (Dinner, Bed & Breakfast)",
        "accommodation": "Tembo House Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Day 2: Leisure and Relaxation",
        "activities": "Start your day with a delicious breakfast at the hotel, followed by a full day of relaxation in the tranquil setting of Zanzibar Queen Hotel. Soak up the warm sun, enjoy the sparkling blue sea, and take in the magnificent views of Mnemba Island from the comfort of your hotel. You can unwind by the pool, take a leisurely stroll along the pristine white sandy beach, or simply relax and enjoy the peaceful atmosphere that surrounds you. As evening approaches, indulge in a delightful dinner, ending your day with a sense of calm and satisfaction.\n\nOvernight: Zanzibar Queen Hotel (Dinner, Bed & Breakfast)",
        "accommodation": "Zanzibar Queen Hotel (Matemwe)",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 3,
        "title": "Day 3: Free Time and Optional Activities",
        "activities": "After a leisurely breakfast at the hotel, the day is yours to enjoy at your own pace. If you're seeking adventure, the nearby Mnemba Island Atoll offers an incredible opportunity for diving and snorkeling among vibrant coral reefs and marine life. For those who prefer a more laid-back experience, you can simply relax and soak up the tranquil atmosphere of the resort, whether by lounging by the pool or enjoying a peaceful walk along the beach. As the day winds down, indulge in a delicious dinner at the hotel, bringing your relaxing day to a perfect close.\n\nOvernight: Zanzibar Queen Hotel (Dinner, Bed & Breakfast)",
        "accommodation": "Zanzibar Queen Hotel",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 4,
        "title": "Day 4: Leisure Day in Matemwe",
        "activities": "After breakfast, enjoy another leisurely day at the hotel or explore optional activities in Matemwe. Whether you prefer to relax on the pristine beach, take a swim, or engage in exciting water sports like snorkeling or diving, this day offers endless possibilities for enjoyment. You can also choose to explore the local area and experience the charming surroundings of Matemwe. As the day winds down, savor a delicious dinner served at the hotel, allowing you to unwind and reflect on another peaceful and rejuvenating day in Zanzibar.\n\nOvernight: Zanzibar Queen Hotel (Dinner, Bed & Breakfast)",
        "accommodation": "Zanzibar Queen Hotel",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 5,
        "title": "Day 5: Stone Town Tour and Departure",
        "activities": "On your final day, enjoy a relaxed breakfast before embarking on a half-day tour of Stone Town. Discover the rich history, winding alleys, and cultural landmarks of this UNESCO World Heritage Site, immersing yourself in its vibrant atmosphere. Take time to shop for souvenirs and explore key attractions such as the bustling markets, historic architecture, and lively streets. After your tour, you will be transferred to Zanzibar Airport for your onward flight, marking the end of your unforgettable Zanzibar journey and ensuring a smooth and pleasant departure.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ],
    "subcategory": "Multi-Day Holidays",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Arrival-matemwe.jpg"
  },
  {
    "id": "zanzibar-mnemba-island-5-days",
    "name": "Zanzibar Tour to Mnemba Island",
    "category": "Zanzibar",
    "duration": "5 Days",
    "priceRange": "$743",
    "fromPrice": 743,
    "badge": "Mnemba Dolphins",
    "rates": [
      {
        "pax": "1 Person",
        "price": 1073,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 743,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 668,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 602,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Zanzibar-tour-to-mnemba-Island1.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Zanzibar-tour-to-mnemba-Island1.jpg",
    "highlights": [
      "Boat expedition to Mnemba Atoll Marine Reserve for premier snorkeling",
      "High chances of spotting wild bottlenose dolphins swimming in the bay",
      "Vibrant underwater coral gardens with green sea turtles, clownfish, and rays",
      "Stay at Zanzibar Queen Hotel offering beachfront luxury and serene hospitality",
      "Full days dedicated to sunbathing, spa treatments, and coastal tranquility"
    ],
    "included": [
      "All airport and ferry port transfers in private air-conditioned vehicle",
      "Accommodation in selected hotel / beach resort as per itinerary",
      "Meals as specified in the itinerary (Breakfast, Lunch, Dinner)",
      "All guided tours, boat trips, and marine reserve fees (Stone Town, Prison Island, Spice Tour, etc.)",
      "All government taxes and Zanzibar tourism levies",
      "Professional licensed English-speaking local tour guide",
      "Bottled drinking water during tours and transfers"
    ],
    "notIncluded": [
      "International and domestic flights to/from Zanzibar",
      "Tanzania tourist entry visa",
      "Travel, medical, and cancellation insurance",
      "Tips and gratuities for guides, boat crew, and hotel staff",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Optional motorized water sports, diving courses, and extra excursions"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival in Zanzibar",
        "activities": "Upon your arrival at Zanzibar Airport, you will be warmly greeted by your driver, ready to take you on a scenic transfer to the northeast coast. The journey will last approximately 1 hour and 20 minutes, giving you a glimpse of the island’s lush landscapes and coastal beauty as you make your way to your accommodation. Your destination, Zanzibar Queen Hotel or a similar tranquil retreat, is located along one of the island’s most secluded beaches. Once you arrive, you can settle into your room and relax, soaking in the peaceful atmosphere of your hideaway as you unwind from your travels and prepare for your Zanzibar adventure.\n\nOvernight: Zanzibar Queen Hotel or similar hotel (Bed & Breakfast)",
        "accommodation": "Tembo House Hotel",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Day 2: Snorkeling and Dolphin Adventure at Mnemba Atoll",
        "activities": "After a delicious breakfast, set off for an exhilarating snorkeling adventure at Mnemba Atoll. You'll embark on a boat ride to the dolphin site, where you'll have the rare chance to swim and interact with dolphins in their natural environment. Next, head to Mnemba Island, renowned for its spectacular snorkeling opportunities amid colorful coral reefs and diverse marine life. As the day winds down, enjoy refreshing drinks and light snacks on a picturesque Sandbank. Finally, return to your hotel to unwind and relax after a thrilling day exploring the underwater wonders of the Indian Ocean.\n\nOvernight: Zanzibar Queen Hotel or similar hotel (Bed & Breakfast)",
        "accommodation": "Zanzibar Queen Hotel (Matemwe)",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 3,
        "title": "Day 3: Leisure Day at Zanzibar Queen Hotel",
        "activities": "Begin your day with a satisfying breakfast and then indulge in a full day of leisure, immersing yourself in the hotel’s serene and inviting atmosphere. Spend time lounging on the pristine beach, where you can soak up the sun and enjoy the gentle sea breeze. Take a refreshing dip in the crystal-clear waters, perfect for cooling off and rejuvenating. As you relax, admire the breathtaking views of Mnemba Island in the distance. Whether you choose to bask in the sun’s warmth or embrace the calm ambiance of the hotel’s surroundings, this day is designed for complete relaxation and enjoyment of Zanzibar’s natural beauty.\n\nOvernight: Zanzibar Queen Hotel or similar hotel (Bed & Breakfast)",
        "accommodation": "Zanzibar Queen Hotel",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 4,
        "title": "Day 4: Full Day of Relaxation",
        "activities": "Following a hearty breakfast, spend another leisurely day at the hotel, fully embracing the sunshine and the stunning Indian Ocean. Take a refreshing swim in the crystal-clear waters, bask in the sun’s warmth, or simply unwind by the beach, enjoying the serene surroundings. This is your chance to savor every moment of your time in this tranquil paradise, making the most of the peaceful ambiance and breathtaking views. Whether you choose to lounge, swim, or simply take in the beauty of your surroundings, this final day promises relaxation and a memorable end to your stay.\n\nOvernight: Zanzibar Queen Hotel or similar hotel (Bed & Breakfast)",
        "accommodation": "Zanzibar Queen Hotel",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 5,
        "title": "Day 5: Departure",
        "activities": "After breakfast, take some time to relax and enjoy the hotel’s amenities before your transfer to Zanzibar International Airport for your departure flight. Use this last bit of free time to reflect on your stay, perhaps savoring the peaceful ambiance one last time. As your journey comes to an end, you’ll leave with cherished memories of an unforgettable Zanzibar experience, filled with serene moments and beautiful sights.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ],
    "subcategory": "Multi-Day Holidays",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/beachfront-bungalow-with-2-1024x684.jpg"
  },
  {
    "id": "zanzibar-kendwa-luxury-6-days",
    "name": "Zanzibar Kendwa Tour",
    "category": "Zanzibar",
    "duration": "6 Days",
    "priceRange": "$1,755",
    "fromPrice": 1755,
    "badge": "5-Star Luxury Resort",
    "rates": [
      {
        "pax": "1 Person",
        "price": 2439,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1755,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 1599,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1462,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/gold-zanzibar-beach-house-3.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2023/06/gold-zanzibar-beach-house-3.jpg",
    "highlights": [
      "5-Star luxury beachfront resort stay on Zanzibar’s most celebrated beach—Kendwa",
      "Uninterrupted swimming at all tides in calm, crystal-clear turquoise waters",
      "Breathtaking panoramic sunset views over the Indian Ocean",
      "World-class gourmet dining, tropical cocktail bars, and infinity pool lounges",
      "Optional sunset dhow cruise, scuba diving, and deep-sea fishing excursions"
    ],
    "included": [
      "All airport and ferry port transfers in private air-conditioned vehicle",
      "Accommodation in selected hotel / beach resort as per itinerary",
      "Meals as specified in the itinerary (Breakfast, Lunch, Dinner)",
      "All guided tours, boat trips, and marine reserve fees (Stone Town, Prison Island, Spice Tour, etc.)",
      "All government taxes and Zanzibar tourism levies",
      "Professional licensed English-speaking local tour guide",
      "Bottled drinking water during tours and transfers"
    ],
    "notIncluded": [
      "International and domestic flights to/from Zanzibar",
      "Tanzania tourist entry visa",
      "Travel, medical, and cancellation insurance",
      "Tips and gratuities for guides, boat crew, and hotel staff",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Optional motorized water sports, diving courses, and extra excursions"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival in Zanzibar",
        "activities": "Upon arrival at Zanzibar Airport, you will receive a warm welcome from the hotel staff and be transferred to the Gold Zanzibar Hotel, located on the picturesque North Coast. This luxurious and creatively designed hotel is just a short drive from the airport. After checking in, take some time to unwind and relax in your beautiful surroundings. Enjoy a delicious dinner and settle in for a restful night’s sleep at the hotel. Your stay includes not only a comfortable bed and a hearty breakfast but also a delightful dinner, ensuring a pleasant and convenient start to your Zanzibar experience.\n\nOvernight: Gold Zanzibar (Dinner + Bed + Breakfast)",
        "accommodation": "Gold Zanzibar Beach House & Spa (Kendwa)",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Day 2: Leisure and Relaxation",
        "activities": "Begin your day with a hearty breakfast at the hotel before immersing yourself in a day of relaxation. Spend the entire day basking in the sun, swimming in the Indian Ocean, and enjoying the hotel's stunning beach. With plenty of time to unwind and take in the serene surroundings, you can fully embrace the peaceful atmosphere and make the most of this leisurely day. As evening approaches, return to the hotel for a delicious dinner and a restful overnight stay, ensuring you are rejuvenated for another day of blissful relaxation.\n\nOvernight: Gold Zanzibar (Dinner + Bed + Breakfast)",
        "accommodation": "Gold Zanzibar Beach House & Spa",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 3,
        "title": "Day 3: Leisure and Relaxation",
        "activities": "After breakfast, spend the entire day enjoying the hotel's luxurious amenities and serene surroundings. Relax on the sandy shores, take a refreshing swim in the inviting waters, or bask in the sun at your own pace. This day is dedicated to ultimate relaxation, allowing you to fully immerse yourself in the tranquil atmosphere. As the day comes to a close, return to the Gold Zanzibar Hotel for a delicious dinner and a comfortable overnight stay, ensuring a perfect end to a day of leisurely enjoyment.\n\nOvernight: Gold Zanzibar (Dinner + Bed + Breakfast)",
        "accommodation": "Gold Zanzibar Beach House & Spa",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 4,
        "title": "Day 4: Leisure and Relaxation",
        "activities": "Start your day with a delightful breakfast at the hotel before diving into another full day of leisure. Spend your time sunbathing on the soft, sandy beach, swimming in the clear, inviting waters, and enjoying the serene beach environment. Take advantage of the hotel’s exceptional amenities, such as lounging by the pool or indulging in beachside refreshments. With plenty of opportunities to unwind and savor the tranquil surroundings, you can truly immerse yourself in relaxation. As the day draws to a close, return to the Gold Zanzibar Hotel for a sumptuous dinner and a restful overnight stay, ensuring a rejuvenating end to a perfect day by the sea.\n\nOvernight: Gold Zanzibar (Dinner + Bed + Breakfast)",
        "accommodation": "Gold Zanzibar Beach House & Spa",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 5,
        "title": "Day 5: Leisure and Optional Activities",
        "activities": "Start your day with a delicious breakfast at the hotel, setting the stage for a day of leisure and exploration. You can choose to spend the day relaxing at the hotel, soaking up the sun, or you might opt to engage in optional activities around Kendwa Beach. Whether you decide to continue your relaxation or venture out to discover local attractions, the day is yours to tailor to your preferences. After a day of enjoyment, return to the Gold Zanzibar Hotel for a delightful dinner and a comfortable overnight stay, ensuring a pleasant end to your day and a restful night in this luxurious setting.\n\nOvernight: Gold Zanzibar (Dinner + Bed + Breakfast)",
        "accommodation": "Gold Zanzibar Beach House & Spa",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 6,
        "title": "Day 6: Departure",
        "activities": "After a leisurely breakfast, enjoy your final morning at the hotel, taking in the last moments of your Zanzibar escape. When it’s time to depart, you’ll be picked up from the hotel and transferred to Zanzibar International Airport for your departure flight. This seamless transfer ensures a smooth and stress-free conclusion to your memorable Zanzibar getaway, allowing you to leave with wonderful memories of your relaxing and enjoyable stay.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ],
    "subcategory": "Multi-Day Holidays",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Kendwa-leisure.jpg"
  },
  {
    "id": "zanzibar-nungwi-beach-6-days",
    "name": "Nungwi Beach Zanzibar Tour",
    "category": "Zanzibar",
    "duration": "6 Days",
    "priceRange": "$1,251",
    "fromPrice": 1251,
    "badge": "White Sand Beach",
    "rates": [
      {
        "pax": "1 Person",
        "price": 1759,
        "currency": "$"
      },
      {
        "pax": "2 Persons",
        "price": 1251,
        "currency": "$"
      },
      {
        "pax": "3 Persons",
        "price": 1135,
        "currency": "$"
      },
      {
        "pax": "4+ Persons",
        "price": 1033,
        "currency": "$"
      }
    ],
    "image": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Nungwi-beach-zanzibar-Tour3.jpg",
    "coverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Nungwi-beach-zanzibar-Tour3.jpg",
    "highlights": [
      "Experience the lively coastal atmosphere and white sands of Nungwi Beach",
      "Visit traditional dhow boat building yards and local sea turtle conservation sanctuary",
      "Sensory aromatic spice farm excursion tasting tropical fruits and exotic spices",
      "Full leisure days on wide sun-drenched beaches with vibrant beach clubs",
      "Stone Town historical heritage tour exploring ancient palaces and Swahili architecture"
    ],
    "included": [
      "All airport and ferry port transfers in private air-conditioned vehicle",
      "Accommodation in selected hotel / beach resort as per itinerary",
      "Meals as specified in the itinerary (Breakfast, Lunch, Dinner)",
      "All guided tours, boat trips, and marine reserve fees (Stone Town, Prison Island, Spice Tour, etc.)",
      "All government taxes and Zanzibar tourism levies",
      "Professional licensed English-speaking local tour guide",
      "Bottled drinking water during tours and transfers"
    ],
    "notIncluded": [
      "International and domestic flights to/from Zanzibar",
      "Tanzania tourist entry visa",
      "Travel, medical, and cancellation insurance",
      "Tips and gratuities for guides, boat crew, and hotel staff",
      "Personal expenses, laundry, and alcoholic beverages / sodas",
      "Optional motorized water sports, diving courses, and extra excursions"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Day 1: Arrival in Stone Town",
        "activities": "Upon landing at Zanzibar Airport, you will be greeted and transferred to Tembo House Hotel, located just 25 minutes away. After checking in, embark on a guided walking tour of Stone Town, delving into the city's rich history through its narrow alleys. Visit key historical sites including the former slave market, now the Anglican Church built in 1871, the town market, Freddy Mercury House, the House of Wonder (Beit-  Al-Ajab), the old Arab Fort, the Palace Museum, the Old Indian Dispensary (cultural center). Enjoy lunch at a local restaurant (own arrangement) before returning to Tembo House Hotel for dinner and overnight accommodations.\n\nOvernight: Tembo House Hotel or similar (Dinner + Bed + Breakfast)",
        "accommodation": "Tembo House Hotel (Stone Town)",
        "meals": "Dinner"
      },
      {
        "day": 2,
        "title": "Day 2: Spice Farm Visit and Transfer to Nungwi",
        "activities": "After a leisurely breakfast and check-out from your hotel, embark on a scenic journey to Nungwi Beach Resort by Turaco. On your way, you'll visit a fascinating spice farm where you’ll learn about the cultivation and diverse uses of spices, including their roles in medicine, cosmetics, and herbal remedies. This immersive experience offers a unique glimpse into Zanzibar's rich spice heritage. Enjoy a traditional lunch at the spice farm before continuing to your beachside destination. Upon arrival at Nungwi Beach Resort, check in and take some time to unwind. Conclude your day with a relaxing dinner and overnight stay at this idyllic retreat by the ocean.\n\nOvernight: Nungwi Beach Resort by Turaco or similar (Dinner + Bed + Breakfast)",
        "accommodation": "Amaan Beach Bungalows / Sandies Baobab (Nungwi)",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 3,
        "title": "Day 3: Leisure at Nungwi Beach",
        "activities": "Enjoy a full day of leisure at Nungwi Beach Resort, making the most of its stunning beachfront location. Spend your time swimming in the clear waters, sunbathing on the sandy shores, and engaging in fun activities right in front of the hotel. With plenty of time to unwind, you can truly relax and soak up the tranquil atmosphere. Whether you choose to lounge by the pool or take part in beach games, this day is all about enjoying the serene setting. After a day of relaxation and enjoyment, return to the resort for a delightful dinner and a restful overnight stay, ensuring a perfect end to your day by the sea.\n\nOvernight: Nungwi Beach Resort by Turaco or similar (Dinner + Bed + Breakfast)",
        "accommodation": "Amaan Beach Bungalows",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 4,
        "title": "Day 4: Full Day of Leisure",
        "activities": "Start your day with a delicious breakfast at the hotel, setting the stage for a full day of relaxation. Spend your time basking in the sun, swimming in the Indian Ocean, and utilizing the hotel’s excellent amenities. Whether you choose to lounge on the beach, explore the local area, or simply enjoy the tranquil ambiance of Nungwi Beach, this day is all about unwinding and savoring the serene surroundings. Return to the resort for a delightful dinner and comfortable overnight accommodations, ensuring a perfect end to a day filled with relaxation and enjoyment.\n\nOvernight: Nungwi Beach Resort by Turaco or similar (Dinner + Bed + Breakfast)",
        "accommodation": "Amaan Beach Bungalows",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 5,
        "title": "Day 5: Leisure and Optional Activities",
        "activities": "After breakfast, enjoy a full day at leisure in Nungwi. You can relax on the pristine beach or engage in optional activities offered at the resort or nearby. Whether you choose to bask in the sun, take part in water sports, or explore local attractions, the day is yours to enjoy as you please. Make the most of the serene surroundings and unwind in this beautiful coastal setting. In the evening, return to the resort for a delicious dinner and another restful overnight stay, ensuring you end your day in comfort and tranquility.\n\nOvernight: Nungwi Beach Resort by Turaco or similar (Dinner + Bed + Breakfast)",
        "accommodation": "Amaan Beach Bungalows",
        "meals": "Breakfast, Dinner"
      },
      {
        "day": 6,
        "title": "Day 6: Departure",
        "activities": "After a final breakfast at the resort, enjoy a relaxing half-day of leisure before your departure. Take in the last moments of your Zanzibar experience by unwinding on the beach or exploring the scenic beauty of Nungwi one last time. Whether it's a peaceful stroll along the shore or a final dip in the Indian Ocean, make the most of your time in this paradise. When it's time to leave, you'll be conveniently transferred to Zanzibar Airport for your departure flight, ensuring a smooth and seamless end to your unforgettable Zanzibar escape.",
        "accommodation": "N/A (Departure)",
        "meals": "Breakfast"
      }
    ],
    "subcategory": "Multi-Day Holidays",
    "hoverImage": "https://zaratanzaniaadventures.com/wp-content/uploads/2024/09/Nungwi-beach-zanzibar-Tour2.jpg"
  },
  {
    "id": "zanzibar-half-day-stone-town-tour",
    "name": "Historical Stone Town Walking Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (3-4 Hours)",
    "priceRange": "$25",
    "fromPrice": 25,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 30,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 20,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 15,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Historical_Stone_Town_walking_Tour_04.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Historical_Stone_Town_walking_Tour_01.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Historical_Stone_Town_walking_Tour_02.jpg",
    "highlights": [
      "UNESCO World Heritage Stone Town walking tour",
      "Discover the House of Wonders and Sultan’s Palace",
      "Explore the historic Old Fort & Freddie Mercury birthplace",
      "Walk through the poignant Former Slave Market and Anglican Cathedral",
      "Wander through vibrant Darajani spice & fruit markets"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Hotel Pickup & Historic Stone Town Exploration",
        "activities": "Meet your private local historian guide at your hotel or the Stone Town meeting point. Begin your journey walking through labyrinthine alleys with intricately carved Swahili doors. Visit the Former Slave Market, Anglican Church, and Sultan Palace Museum.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Mineral Water & Zanzibari Spiced Coffee Tasting"
      },
      {
        "day": 2,
        "title": "Mid-Morning: Cultural Landmarks & Darajani Market Walk",
        "activities": "Explore the 17th-century Omani Old Fort, marvel at the exterior architecture of the House of Wonders, and photograph Freddie Mercury’s childhood home. Walk through lively Darajani Market to smell exotic cloves, vanilla, and fresh tropical fruit before returning to your hotel.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Tropical Fruit Tasting"
      }
    ],
    "included": [
      "Round-trip hotel transfer in Zanzibar",
      "Certified English/multilingual Stone Town local guide",
      "All historical site and museum entrance fees",
      "Bottled drinking water throughout the tour"
    ],
    "notIncluded": [
      "Personal expenses & souvenirs",
      "Guide gratuities / tips",
      "Travel insurance"
    ],
    "badge": "Cultural Heritage"
  },
  {
    "id": "zanzibar-half-day-mnemba-dolphins-snorkeling-trip",
    "name": "Mnemba Dolphins & Snorkeling Trip",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (4-5 Hours)",
    "priceRange": "$35",
    "fromPrice": 35,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 65,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 35,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 30,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Mnemba_Dolphins_Snorkeling_Trip_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Mnemba_Dolphins_Snorkeling_Trip_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Mnemba_Dolphins_Snorkeling_Trip_01.jpg",
    "highlights": [
      "Encounter wild playful bottlenose dolphins in their natural habitat",
      "World-class snorkeling along the protected Mnemba Atoll reefs",
      "Crystal-clear waters with 20+ meters underwater visibility",
      "Spot clownfish, sea turtles, moray eels, and vibrant corals",
      "Fresh tropical fruit buffet served on board"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Boat Launch & Dolphin Encounter at Muyuni / Matemwe",
        "activities": "Early morning hotel pickup and transfer to the northeastern coast of Matemwe. Board a motorized local boat and cruise into the sparkling turquoise waters. Search for pods of wild dolphins swimming and leaping alongside the boat with chances to swim nearby under expert supervision.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Mnemba Atoll Coral Snorkeling & Fruit Feast",
        "activities": "Head to the coral gardens surrounding the Mnemba Island Marine Sanctuary. Put on top-quality snorkeling gear to explore colorful coral heads filled with exotic tropical fish, starfish, and rays. Savor a feast of sweet watermelon, mangoes, and pineapples before sailing back to shore.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Seasonal Tropical Fruit Platter & Refreshments"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Private or shared boat cruise to Mnemba Atoll",
      "Full snorkeling equipment (masks, snorkels, fins, life vests)",
      "Marine conservation entry permits",
      "Professional boat captain and marine guide",
      "Fresh tropical fruits and bottled mineral water"
    ],
    "notIncluded": [
      "Tips for boat crew and guide",
      "Personal travel insurance",
      "Alcoholic beverages"
    ],
    "badge": "Marine Adventure"
  },
  {
    "id": "zanzibar-half-day-prison-island-tour",
    "name": "Prison Island Tour (Giant Tortoises & Snorkeling)",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (3-4 Hours)",
    "priceRange": "$25",
    "fromPrice": 25,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 45,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 28,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 22,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Prison_Island_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Prison_Island_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Prison_Island_Tour_01.jpg",
    "highlights": [
      "Scenic 30-minute wooden dhow boat ride across the azure channel",
      "Hand-feed century-old giant Aldabra tortoises (some over 190 years old!)",
      "Tour the historic 1893 quarantine station and colonial prison ruins",
      "Snorkel along the vibrant fringing coral reef around the island",
      "Relax on the powdery white sand beach with views of Stone Town"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Dhow Cruise to Changuu (Prison) Island",
        "activities": "Depart from the Stone Town waterfront on a traditional wooden boat. Enjoy views of Stone Town’s historic skyline from the water. Arrive at Changuu Island, originally built in 1893 by the British as a prison for rebellious slaves and later used as a yellow fever quarantine station.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Giant Tortoise Sanctuary & Reef Snorkeling",
        "activities": "Visit the sanctuary dedicated to the endangered Aldabra giant tortoises, gifted by the Seychelles in 1919. Pet and feed these gentle giants cabbage leaves. Follow with snorkeling among coral reefs and colorful reef fish before the scenic boat cruise back to Stone Town.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Refreshments"
      }
    ],
    "included": [
      "Roundtrip boat transfers to Prison Island",
      "Hotel pickup and drop-off",
      "Prison Island entry and tortoise sanctuary fees",
      "Snorkeling equipment (mask, snorkel, fins)",
      "Professional certified English guide",
      "Bottled drinking water"
    ],
    "notIncluded": [
      "Guide gratuities",
      "Personal souvenirs",
      "Travel insurance"
    ],
    "badge": "Wildlife & History"
  },
  {
    "id": "zanzibar-half-day-spice-farms-tour",
    "name": "Zanzibar Spice Farms Sensory Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (3 Hours)",
    "priceRange": "$25",
    "fromPrice": 25,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 30,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 18,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 15,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Spice_Farms_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Spice_Farms_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Spice_Farms_Tour_01.jpg",
    "highlights": [
      "Discover why Zanzibar is celebrated worldwide as the \"Spice Island\"",
      "Touch, smell, and taste fresh cloves, nutmeg, cinnamon, vanilla, and cardamom",
      "Watch a local \"butterfly man\" climb a soaring coconut palm while singing",
      "Receive handmade palm-leaf crowns, ties, and flower necklaces",
      "Taste an incredible array of fresh seasonal tropical fruits"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Guided Walk Through Rural Spice Plantations",
        "activities": "Travel into the lush rural countryside of Kizimbani. Take a sensory walking tour led by an expert botanist who reveals how exotic spices, herbs, and medicinal plants grow in their natural state. Crush cinnamon bark, scratch nutmeg pods, and taste wild black pepper and fresh lemongrass.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Coconut Water & Tropical Fruits"
      },
      {
        "day": 2,
        "title": "Mid-Morning: Coconut Tree Show & Spiced Tea Tasting",
        "activities": "Marvel at local climbers ascending towering coconut trees to harvest fresh green coconuts for you to drink right on the spot. Enjoy a fragrant cup of spiced herbal tea, learn Swahili home remedies, and shop for 100% organic farm-fresh spices to take home.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Spiced Zanzibari Tea & Sweet Banana Tasting"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Professional agricultural/spice guide",
      "All farm admission and tasting fees",
      "Fresh coconut water & tropical fruit tasting",
      "Handmade palm leaf accessories & bottled water"
    ],
    "notIncluded": [
      "Guide tips",
      "Personal purchases of boxed spices",
      "Travel insurance"
    ],
    "badge": "Sensory Experience"
  },
  {
    "id": "zanzibar-half-day-nakupenda-sandbank",
    "name": "Nakupenda Sandbank Paradise Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (4-5 Hours)",
    "priceRange": "$40",
    "fromPrice": 40,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 70,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 40,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 30,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 22,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg",
    "highlights": [
      "Cruise to the world-famous Nakupenda (\"I Love You\") vanishing sandbank",
      "Pristine talcum-white sands surrounded by turquoise crystal waters",
      "Superb coral reef snorkeling with hundreds of tropical fish species",
      "Sumptuous beach seafood barbecue with lobster, prawns, and calamari",
      "Relax under traditional shaded canopies in the middle of the Indian Ocean"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Sail to Nakupenda Vanishing Sandbank",
        "activities": "Board a traditional motorized dhow boat from Stone Town and sail 20 minutes across transparent turquoise waters. Arrive at Nakupenda Sandbank, a stunning sand strip that rises from the Indian Ocean during low tide and disappears under high tide.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water & Fruit Drinks"
      },
      {
        "day": 2,
        "title": "Midday: Snorkeling & Gourmet Seafood Beach BBQ",
        "activities": "Snorkel the surrounding coral gardens with an expert guide or swim in the warm calm shallows. Meanwhile, our private chef grills fresh ocean lobster, jumbo prawns, calamari, and yellowfin tuna served with fragrant Swahili coconut rice and a vibrant tropical fruit platter.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Grilled Seafood Barbecue & Tropical Fruits"
      }
    ],
    "included": [
      "Roundtrip boat cruise to Nakupenda Sandbank",
      "Hotel pickup and drop-off",
      "Fresh seafood lunch with grilled lobster, prawns, fish & calamari",
      "Snorkeling equipment (mask, snorkel, life vest)",
      "Sunshade canopy setup & beach matting",
      "Fresh tropical fruits and unlimited bottled water"
    ],
    "notIncluded": [
      "Guide/crew tips",
      "Alcoholic drinks",
      "Travel insurance"
    ],
    "badge": "Pure Paradise"
  },
  {
    "id": "zanzibar-half-day-jozani-forest-tour",
    "name": "Jozani Forest Tour (Red Colobus Monkeys)",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (3 Hours)",
    "priceRange": "$25",
    "fromPrice": 25,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 45,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 20,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_01.jpg",
    "highlights": [
      "Explore Zanzibar’s only national park and UNESCO Biosphere Reserve",
      "Get close to the playful, critically endangered Kirk’s Red Colobus monkeys",
      "Walk the elevated wooden boardwalk through the pristine mangrove forest",
      "Discover ancient mahogany, eucalyptus, and medicinal rainforest trees",
      "Spot Sykes monkeys, colorful butterflies, and rare endemic bird species"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Red Colobus Monkey Encounter in Jozani National Park",
        "activities": "Pick up from your resort and drive to Jozani-Chwaka Bay National Park. Accompanied by a park ranger, take a gentle guided walk through the indigenous groundwater forest. Watch curious Red Colobus monkeys jumping between branches, grooming each other, and feeding on leaves just feet away.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Mid-Morning: Mangrove Boardwalk Nature Trail",
        "activities": "Cross over to Pete Inlet and traverse the elevated wooden boardwalk suspended over a lush mangrove swamp. Learn how red, black, and white mangroves protect the coastline from erosion and support marine ecosystems before heading back to your hotel.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Refreshments"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Jozani National Park conservation entry fees",
      "Certified park ranger and naturalist guide",
      "Mangrove boardwalk permits and bottled water"
    ],
    "notIncluded": [
      "Tips for ranger guide",
      "Personal expenses",
      "Travel insurance"
    ],
    "badge": "National Park"
  },
  {
    "id": "zanzibar-half-day-sunset-dhow-cruise",
    "name": "Sunset Dhow Cruise Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (2.5 Hours - Late Afternoon)",
    "priceRange": "$25",
    "fromPrice": 25,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 45,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 28,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 22,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Sunset_Dhow_Cruise_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Sunset_Dhow_Cruise_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Sunset_Dhow_Cruise_01.jpg",
    "highlights": [
      "Sail on a handcrafted wooden Swahili dhow with lateen canvas sail",
      "Breathtaking golden-hour panoramic views of the Indian Ocean",
      "Live Swahili acoustic music or drumming as the sun sinks into the sea",
      "Complimentary chilled drinks, local beers, wine, and Swahili appetizers",
      "Perfect romantic couples and photography experience"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Late Afternoon: Boarding the Traditional Swahili Dhow",
        "activities": "Board your traditional dhow from Stone Town or Nungwi / Kendwa beach at 4:30 PM. Feel the ocean breeze as the crew unfurls the iconic triangular sail and cruises gently along the scenic coastline with views of coastal cliffs and fishing boats.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Chilled Refreshments, Soft Drinks & Local Beer/Wine"
      },
      {
        "day": 2,
        "title": "Sunset: Golden Hour Horizon & Swahili Canapés",
        "activities": "As the sun dips below the turquoise Indian Ocean horizon in shades of orange, purple, and gold, enjoy fresh samosas, cassava crisps, tropical fruits, and chilled drinks with soothing Swahili acoustic rhythms before returning to shore by 7:00 PM.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Swahili Finger Food & Sunset Canapés"
      }
    ],
    "included": [
      "Return hotel transfers in Zanzibar",
      "2.5-hour traditional sailing dhow cruise",
      "Chilled refreshments, fruit juices, local beer, and wine",
      "Fresh Swahili snacks and tropical fruits",
      "Experienced boat captain and crew"
    ],
    "notIncluded": [
      "Gratuities for boat crew",
      "Personal souvenirs",
      "Travel insurance"
    ],
    "badge": "Romantic Sunset"
  },
  {
    "id": "zanzibar-half-day-kizimkazi-dolphins-tour",
    "name": "Kizimkazi Dolphins & Coastal Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (4 Hours)",
    "priceRange": "$30",
    "fromPrice": 30,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 55,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 30,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 30,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 25,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Kizimkazi_Dolphins_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Kizimkazi_Dolphins_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Kizimkazi_Dolphins_Tour_01.jpg",
    "highlights": [
      "Visit historic Kizimkazi, home of the oldest Islamic mosque in East Africa (1107 AD)",
      "Early morning boat cruise to spot wild humpback and bottlenose dolphins",
      "Swim alongside dolphins in the open coastal waters",
      "Snorkel above shallow, protected coral reefs bursting with fish",
      "Scenic drive through southern Zanzibar fishing villages"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Early Morning: Coastal Drive to Kizimkazi Fishing Village",
        "activities": "Early morning hotel departure to southern Zanzibar. Board a motorized boat with experienced local fishermen. Navigate the coastal waters where pods of wild spinner and bottlenose dolphins feed and play every morning in the calm coastal shallows.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Mid-Morning: Dolphin Swimming & Historic 12th-Century Mosque Visit",
        "activities": "Equipped with mask and fins, gently slip into the clear water to swim near dolphins. Cruise over to nearby coral reefs for snorkeling, followed by a visit to Kizimkazi Dimbani Mosque, with Kufic inscriptions dating back to 1107 AD.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Refreshments"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Motorized boat and experienced local captain",
      "Snorkeling gear (mask, snorkel, fins, life jackets)",
      "Kizimkazi marine reserve entrance fees",
      "Fresh fruit and bottled water"
    ],
    "notIncluded": [
      "Tips for crew",
      "Personal expenses",
      "Travel insurance"
    ],
    "badge": "Marine Wildlife"
  },
  {
    "id": "zanzibar-half-day-the-rock-restaurant",
    "name": "The Rock Restaurant & Michamvi Beach Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (3.5 Hours)",
    "priceRange": "$25",
    "fromPrice": 25,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 45,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 20,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/The_Rock_Restaurant_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/The_Rock_Restaurant_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/The_Rock_Restaurant_01.jpg",
    "highlights": [
      "Visit the iconic world-famous The Rock Restaurant perched in the Indian Ocean",
      "Walk to the rock during low tide or take a traditional wooden boat at high tide",
      "Relax on the scenic rooftop terrace overlooking turquoise ocean waves",
      "Stroll along Michamvi and Pingwe’s quiet, pristine powder-sand beaches",
      "Unmatched photography opportunities of Zanzibar’s most famous landmark"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning / Afternoon: Scenic Drive to Michamvi Peninsula",
        "activities": "Transfer by private air-conditioned vehicle to the southeastern coast of Michamvi. Arrive at Pingwe Beach to see the extraordinary sight of a thatched wooden restaurant perched atop a standalone coral outcrop in the middle of turquoise water.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Visit The Rock & Coastal Beach Stroll",
        "activities": "Walk out across the coral seabed during low tide or board a small rowboat during high tide. Ascend the wooden staircase to enjoy drinks or lunch on the open-air deck (meal expenses paid directly). Enjoy free time strolling Michamvi beach before returning to your hotel.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Refreshments"
      }
    ],
    "included": [
      "Private round-trip hotel transfer in Zanzibar",
      "Wooden rowboat transfer to the rock during high tide",
      "Table reservation assistance at The Rock",
      "Professional driver guide and bottled mineral water"
    ],
    "notIncluded": [
      "Food and drinks ordered at The Rock Restaurant",
      "Gratuities",
      "Travel insurance"
    ],
    "badge": "Iconic Landmark"
  },
  {
    "id": "zanzibar-half-day-quad-bike-tour",
    "name": "Zanzibar Quad Bike Off-Road Adventure Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (3.5 Hours)",
    "priceRange": "$65",
    "fromPrice": 65,
    "rates": [
      {
        "pax": "Solo Rider",
        "price": 90,
        "currency": "USD"
      },
      {
        "pax": "2 Persons (Double Quad)",
        "price": 65,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 55,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 48,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Quad_Bike_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Quad_Bike_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Quad_Bike_Tour_01.jpg",
    "highlights": [
      "Thrilling off-road quad biking through Zanzibar’s rugged interior trails",
      "Ride through sugar cane fields, coconut groves, and baobab valleys",
      "Visit a traditional Swahili village and interact with local families",
      "Taste fresh tropical fruit and coconut water straight from the palm",
      "Automatic easy-to-drive 4x4 quad bikes suitable for beginners and pros"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Safety Briefing & Trail Ride Through Coconut Plantations",
        "activities": "Hotel pickup and transfer to the quad bike base. Receive a full safety briefing, helmet, and goggles before test-riding your automatic 4x4 quad. Follow the guide onto red-dirt trails, riding through local farming communities and dense palm forests.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Remote Swahili Village Visit & Coastal Trail",
        "activities": "Stop at a remote mud-thatch Swahili village. Meet the local village elder and children, observe daily life, and enjoy fresh young coconuts opened right in front of you. Finish with a fast-paced off-road ride along coastal sandy tracks before heading back to the base.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Coconut Water & Tropical Snacks"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Modern 4x4 automatic quad bike (ATV)",
      "Safety helmet, goggles, and riding bandana",
      "Expert lead and sweep trail guides",
      "Village donation, fresh coconuts, and bottled water"
    ],
    "notIncluded": [
      "Guide gratuities",
      "Personal expenses",
      "Travel insurance"
    ],
    "badge": "Off-Road Action"
  },
  {
    "id": "zanzibar-half-day-nungwi-beach-tour",
    "name": "Nungwi Beach & Dhow Boat Building Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (4 Hours)",
    "priceRange": "$25",
    "fromPrice": 25,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 45,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 20,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Nungwi_Beach_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Nungwi_Beach_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Nungwi_Beach_Tour_01.jpg",
    "highlights": [
      "Visit Nungwi on the northern tip, Zanzibar’s liveliest beach paradise",
      "Watch master shipwrights carve traditional wooden dhow boats by hand",
      "Visit the historical 19th-century Ras Nungwi Lighthouse",
      "Swim in crystal clear waters unaffected by significant tidal changes",
      "Explore local artisan markets, seaside cafes, and beach boutiques"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Traditional Dhow Boat Builders of Nungwi",
        "activities": "Scenic drive to northern Zanzibar. Walk along Nungwi beach to the traditional boatyards where local carpenters use centuries-old tools to build oceangoing wooden dhows from mahogany and mango wood without modern blueprints.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Mid-Morning: Ras Nungwi Lighthouse & Beach Free Time",
        "activities": "Walk to the historic Ras Nungwi Lighthouse and photograph the panoramic ocean vistas. Spend leisure time swimming in the turquoise sea where tides never leave the beach dry, relaxing under a beach umbrella or visiting coastal boutiques.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Refreshments"
      }
    ],
    "included": [
      "Round-trip hotel transfer in Zanzibar",
      "Professional certified English guide",
      "Dhow shipyard tour and lighthouse visit",
      "Bottled drinking water"
    ],
    "notIncluded": [
      "Guide tips",
      "Personal purchases",
      "Travel insurance"
    ],
    "badge": "Coastal Culture"
  },
  {
    "id": "zanzibar-half-day-salaam-cave-tour",
    "name": "Salaam Cave Exploration & Natural Swimming Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (3 Hours)",
    "priceRange": "$25",
    "fromPrice": 25,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 45,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 20,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Salaam_Cave_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Salaam_Cave_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Salaam_Cave_Tour_01.jpg",
    "highlights": [
      "Explore the ancient limestone formations of Salaam Cave",
      "Swim in pristine, mineral-rich subterranean freshwater pools",
      "Admire dramatic hanging stalactites and rising stalagmites",
      "Learn about ancient Swahili spiritual rituals and cave folklore",
      "Escape the heat in a refreshing natural underground oasis"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Descend into Salaam Cave Underground World",
        "activities": "Transfer to Salaam Cave on the eastern side of Zanzibar. Descend wooden stairs into an ancient underground cavern with crystalline water filtered naturally through limestone rock. Marvel at spectacular natural rock formations and natural light shafts.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Swimming in Sacred Waters & Cultural Insights",
        "activities": "Enjoy a cool swim in the deep freshwater pool inside the cave, revered by locals for centuries for its healing properties. Listen to your guide share the geological history and ancient legends of Zanzibar before returning to your hotel.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Fruit Refreshments"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Salaam Cave admission fees and guided tour",
      "Swim access in the natural cave pool",
      "Bottled water and local guide"
    ],
    "notIncluded": [
      "Tips",
      "Personal expenses",
      "Travel insurance"
    ],
    "badge": "Hidden Wonder"
  },
  {
    "id": "zanzibar-half-day-baraka-aquarium-tour",
    "name": "Baraka Natural Aquarium (Swim with Sea Turtles)",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (3 Hours)",
    "priceRange": "$25",
    "fromPrice": 25,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 45,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 25,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 20,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Baraka_Aquarium_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Baraka_Aquarium_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Baraka_Aquarium_Tour_01.jpg",
    "highlights": [
      "Swim alongside friendly rescued green sea turtles in a natural tidal lagoon",
      "Hand-feed fresh seaweed to these gentle marine creatures",
      "Learn about sea turtle rehabilitation and marine conservation efforts",
      "Take unforgettable underwater photos with masks and snorkels provided",
      "Family-friendly experience suitable for all ages and swimmers"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Transfer to Nungwi & Turtle Sanctuary Intro",
        "activities": "Pickup from your resort and travel to the Baraka Natural Aquarium located in Nungwi. Learn about how this community-led project rescues injured sea turtles accidentally caught in local fishing nets, rehabilitates them, and releases them back into the Indian Ocean.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Swimming & Hand-Feeding Sea Turtles",
        "activities": "Step into the clear natural rock pool and feed sea turtles handfuls of sea lettuce. Snorkel and swim gently next to them as they glide effortlessly around you. Excellent photo opportunities before transferring back to your resort.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Fruit Refreshments"
      }
    ],
    "included": [
      "Round-trip hotel transfers in Zanzibar",
      "Baraka Natural Aquarium entrance and conservation fees",
      "Seaweed for turtle feeding and snorkeling mask",
      "Professional guide and bottled water"
    ],
    "notIncluded": [
      "Tips for conservation staff",
      "Personal expenses",
      "Travel insurance"
    ],
    "badge": "Turtle Sanctuary"
  },
  {
    "id": "zanzibar-half-day-village-tour",
    "name": "Zanzibar Authentic Cultural Village Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (3.5 Hours)",
    "priceRange": "$30",
    "fromPrice": 30,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 40,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 30,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 22,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 16,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Village_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Village_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Village_Tour_01.jpg",
    "highlights": [
      "Step away from tourist hotels and experience true Zanzibari village life",
      "Watch women weave traditional palm mats and make coconut rope (Makuti)",
      "Visit a local primary school, health dispensary, and village well",
      "Learn how traditional Swahili mud-and-coral houses are constructed",
      "Enjoy authentic homemade cassava porridge and Swahili tea with villagers"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Village Welcoming & Traditional Craft Demonstration",
        "activities": "Travel to a traditional rural village like Muyuni or Jambiani. Be greeted with genuine Swahili hospitality. Watch local women demonstrate coconut husking, palm leaf basket weaving, and natural pottery techniques passed down through generations.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Swahili Spiced Tea & Fried Cassava"
      },
      {
        "day": 2,
        "title": "Community Walk & Village School Visit",
        "activities": "Walk through the village along peaceful dirt footpaths. Visit the village dispensary, water well, and community school (subject to school calendar). Learn how cassava flour is milled by mortar and pestle and participate in local daily chores.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Platter"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Village entry and community contribution fee",
      "English-speaking local Swahili village guide",
      "Traditional tea and snack tasting, bottled drinking water"
    ],
    "notIncluded": [
      "Tips",
      "Personal donations to school/dispensary",
      "Travel insurance"
    ],
    "badge": "Authentic Culture"
  },
  {
    "id": "zanzibar-half-day-fishing-game-tour",
    "name": "Zanzibar Deep-Sea Fishing Game Tour",
    "category": "Zanzibar",
    "subcategory": "Half Day Tours",
    "duration": "Half Day (4-5 Hours)",
    "priceRange": "$75",
    "fromPrice": 75,
    "rates": [
      {
        "pax": "Solo Angler",
        "price": 130,
        "currency": "USD"
      },
      {
        "pax": "2 Anglers",
        "price": 75,
        "currency": "USD"
      },
      {
        "pax": "4 Anglers",
        "price": 60,
        "currency": "USD"
      },
      {
        "pax": "6 Anglers (Boat Charter)",
        "price": 50,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Fishing_Game_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Fishing_Game_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Fishing_Game_Tour_01.jpg",
    "highlights": [
      "Fish the nutrient-rich deep waters of the Zanzibar and Pemba channels",
      "Target Yellowfin Tuna, Dorado (Mahi-Mahi), Kingfish, Wahoo, and Sailfish",
      "Fully equipped sportfishing boat with GPS, fishfinder, and outriggers",
      "Professional Penn and Shimano rods, reels, and fresh artificial lures provided",
      "Experienced skipper and professional deckhand to assist at all times"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Departure & Trolling in Deep Coastal Channels",
        "activities": "Early morning hotel pickup and boat launch from Nungwi or Stone Town. Set out past the coastal drop-off into deep waters where Indian Ocean currents attract large pelagic game fish. The crew sets out multiple trolling lines using modern lures and bait.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Water, Soft Drinks & Energy Snacks"
      },
      {
        "day": 2,
        "title": "Deep Sea Action & Return Cruise with Catch",
        "activities": "Experience the adrenaline of hearing the reel scream as a big game fish strikes. Fight your fish with expert guidance from the skipper. Practice catch-and-release or bring home fresh fillets for your hotel chef to prepare for dinner.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Platter & Sandwiches"
      }
    ],
    "included": [
      "Hotel transfers to and from the fishing marina",
      "Private/shared sportfishing vessel with safety equipment",
      "High-end rods, reels, lines, lures, and terminal tackle",
      "Professional skipper and experienced deck crew",
      "Marine park fishing licenses, sandwiches, fruit, and beverages"
    ],
    "notIncluded": [
      "Gratuities for boat crew",
      "Alcoholic beverages",
      "Travel insurance"
    ],
    "badge": "Sport Fishing"
  },
  {
    "id": "zanzibar-full-day-safari-blue-trip",
    "name": "Full Day - Safari Blue Signature Trip",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (8 Hours)",
    "priceRange": "$65",
    "fromPrice": 65,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 105,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 65,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 55,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 48,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Full_Day_Safari_Blue_Trip_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Full_Day_Safari_Blue_Trip_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Full_Day_Safari_Blue_Trip_01.jpg",
    "highlights": [
      "Zanzibar’s #1 full-day marine adventure in Menai Bay Conservation Area",
      "Cruise in handcrafted sailing dhows and spot wild resident dolphins",
      "Snorkel across two distinct, thriving coral reefs teeming with sea life",
      "Sumptuous beach buffet lunch: grilled lobster, king prawns, fish, and calamari",
      "Swim in a hidden natural mangrove lagoon and climb a 500-year-old giant baobab"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Departure from Fumba & Menai Bay Dolphin Cruise",
        "activities": "Early morning hotel pickup to Fumba fishing village. Board a motorized handcrafted dhow and set sail into Menai Bay Conservation Area, an uninhabited marine reserve. Search for humpback and bottlenose dolphins swimming along the dhow.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water & Fruit Juices"
      },
      {
        "day": 2,
        "title": "Mid-Morning: Sandbank Relaxation & Guided Coral Snorkeling",
        "activities": "Drop anchor at a pristine vanishing sandbank in the open ocean. Put on provided snorkeling gear and explore thriving coral reefs with tropical reef fish, blue starfish, and rays. Relax on the warm white sands while crew serves fresh fruit slices.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Buffet"
      },
      {
        "day": 3,
        "title": "Afternoon: Kwale Island Seafood Feast & Ancient Baobab Tree",
        "activities": "Sail to Kwale Island for a lavish beach banquet: succulent grilled lobster, tiger prawns, calamari, chicken, fragrant rice, and a tasting of 10+ exotic tropical fruits. Visit a fallen 500-year-old hollow baobab tree you can climb inside.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Gourmet Seafood Beach Barbecue & Tropical Fruits"
      },
      {
        "day": 4,
        "title": "Late Afternoon: Mangrove Lagoon Swim & Sail Back to Fumba",
        "activities": "Cruise into an emerald-green mangrove lagoon through a natural coral rock opening for a peaceful swim. Hoist the large canvas sail on the return journey to Fumba while enjoying the sea breeze, then transfer back to your hotel by 5:30 PM.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Afternoon Coffee & Amarula Liqueur Tasting"
      }
    ],
    "included": [
      "Round-trip hotel transfers across Zanzibar",
      "Full-day cruise aboard traditional sailing dhow with marine safety gear",
      "Menai Bay Conservation Area park permits",
      "All snorkeling equipment with instruction and life jackets",
      "Gourmet seafood buffet lunch with lobster, prawns, fish & calamari",
      "Unlimited bottled water, soft drinks, and tropical fruits"
    ],
    "notIncluded": [
      "Tips for crew and guides",
      "Travel insurance",
      "Personal items"
    ],
    "badge": "Best Seller"
  },
  {
    "id": "zanzibar-full-day-spice-farm-prison-island-stone-town",
    "name": "Full Day - Spice Farm, Prison Island & Stone Town",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (8 Hours)",
    "priceRange": "$75",
    "fromPrice": 75,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 120,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 75,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 60,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 52,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Historical_Stone_Town_walking_Tour_04.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Spice_Farms_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Historical_Stone_Town_walking_Tour_01.jpg",
    "highlights": [
      "The ultimate trio: Zanzibar’s three most famous cultural and historic icons in one seamless day",
      "Touch and taste organic spices and medicinal herbs on a rural plantation",
      "Cruise to Prison Island to hand-feed century-old giant Aldabra tortoises",
      "Enjoy an authentic Zanzibari lunch at a local rooftop restaurant in Stone Town",
      "Complete guided walking tour of UNESCO World Heritage Stone Town"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Rural Spice Farm Exploration",
        "activities": "Begin your day at 8:30 AM with hotel pickup. Drive to the countryside to tour a renowned spice plantation. Smell, touch, and taste cloves, vanilla, nutmeg, cinnamon, and black pepper. Watch a coconut palm climber and receive handmade palm crowns.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Coconut Water & Tropical Fruit Snacks"
      },
      {
        "day": 2,
        "title": "Midday: Boat Ride to Prison Island & Giant Tortoises",
        "activities": "Transfer to Stone Town port and board a wooden boat to Prison Island. Feed and interact with giant tortoises, walk through the 1893 historic quarantine building, and enjoy panoramic ocean views before cruising back to Stone Town.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 3,
        "title": "Afternoon: Swahili Lunch & Historic Stone Town Guided Walk",
        "activities": "Savor a delicious Zanzibari lunch in Stone Town. Embark on a walking tour through narrow streets: visit the Former Slave Market, Sultan’s Palace, House of Wonders, Freddie Mercury house, and Old Fort before transfer back to your hotel by 5:00 PM.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Traditional Zanzibari Lunch"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Roundtrip boat to Prison Island and island entry permits",
      "Spice plantation admission, guide, and fruit tasting",
      "Authentic lunch in Stone Town",
      "Stone Town historical site entrance fees and professional guide",
      "Bottled drinking water throughout the day"
    ],
    "notIncluded": [
      "Guide/boat crew tips",
      "Personal souvenirs",
      "Travel insurance"
    ],
    "badge": "Triple Highlight"
  },
  {
    "id": "zanzibar-full-day-jozani-forest-spice-farm-stone-town",
    "name": "Full Day - Jozani Forest, Spice Farm & Stone Town",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (8 Hours)",
    "priceRange": "$75",
    "fromPrice": 75,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 120,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 75,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 60,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 52,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_03.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_01.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_03.jpg",
    "highlights": [
      "Experience Zanzibar’s nature, agriculture, and urban heritage in one day",
      "Encounter endangered Kirk’s Red Colobus monkeys in Jozani National Park",
      "Explore the elevated mangrove swamp boardwalk trail",
      "Sensory spice farm walking tour with exotic tastings",
      "Full guided walking tour of UNESCO World Heritage Stone Town with lunch"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Jozani National Park & Red Colobus Monkeys",
        "activities": "Depart at 8:30 AM to Jozani Forest. Walk under towering mahogany canopies with a naturalist ranger to spot the rare Red Colobus monkeys. Walk across the wooden boardwalk through lush mangrove swamps.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Organic Spice Plantation Tour & Coconut Show",
        "activities": "Head to the rural spice belt. Learn the culinary and medical secrets of Zanzibar’s spices. Watch the local climber scale high coconut palms and enjoy a refreshing fresh coconut drink.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Tasting & Coconut Water"
      },
      {
        "day": 3,
        "title": "Afternoon: Swahili Lunch & Comprehensive Stone Town Tour",
        "activities": "Arrive in Stone Town for lunch. Walk through winding streets visiting the Old Slave Market site, Anglican Cathedral, Old Arab Fort, and Sultan’s Palace before returning to your hotel in the evening.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Swahili Lunch in Stone Town"
      }
    ],
    "included": [
      "Roundtrip private transport from any Zanzibar hotel",
      "Jozani National Park conservation entrance fees and ranger",
      "Spice farm admission, guide, and fruit tasting",
      "Stone Town museum/historic site tickets",
      "Authentic lunch in Stone Town and bottled drinking water"
    ],
    "notIncluded": [
      "Gratuities",
      "Personal purchases",
      "Travel insurance"
    ],
    "badge": "Nature & Culture"
  },
  {
    "id": "zanzibar-full-day-jozani-forest-spice-farm-prison-island",
    "name": "Full Day - Jozani Forest, Spice Farm & Prison Island",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (8 Hours)",
    "priceRange": "$75",
    "fromPrice": 75,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 120,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 75,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 60,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 52,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Prison_Island_Tour_02.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Jozani_Forest_Tour_01.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Prison_Island_Tour_02.jpg",
    "highlights": [
      "Zanzibar’s top wildlife and agricultural combo tour",
      "Meet the friendly Aldabra giant tortoises on Prison Island",
      "Snorkel above pristine coral reefs in the clear channel waters",
      "Immerse in the scents and tastes of exotic spices at a plantation",
      "Observe endangered Red Colobus monkeys in indigenous Jozani forest"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Prison Island Boat Cruise & Giant Tortoises",
        "activities": "Depart on a wooden boat to Prison Island. Feed the 100+ year-old giant tortoises, explore colonial prison ruins, and enjoy beach relaxation before cruising back to the mainland.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Spice Farm Sensory Tour & Farm Lunch",
        "activities": "Drive to the spice farms. Walk through cardamom, vanilla, and cinnamon gardens. Enjoy a freshly prepared Swahili lunch cooked with spices picked straight from the plantation.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Spice Farm Swahili Lunch"
      },
      {
        "day": 3,
        "title": "Afternoon: Jozani Forest Wildlife & Mangrove Trail",
        "activities": "Continue south to Jozani National Park. Walk along shaded jungle trails to photograph Kirk’s Red Colobus monkeys and explore the coastal mangrove ecosystem before evening hotel drop-off.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Refreshments"
      }
    ],
    "included": [
      "Round-trip hotel transfers in Zanzibar",
      "Prison Island boat cruise and sanctuary admission",
      "Spice farm tour with Swahili lunch and fruit tasting",
      "Jozani National Park conservation fees and naturalist guide",
      "Bottled drinking water"
    ],
    "notIncluded": [
      "Guide tips",
      "Personal expenses",
      "Travel insurance"
    ],
    "badge": "Wildlife Focus"
  },
  {
    "id": "zanzibar-full-day-prison-island-nakupenda-sandbank",
    "name": "Full Day - Prison Island & Nakupenda Sandbank",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (7 Hours)",
    "priceRange": "$65",
    "fromPrice": 65,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 105,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 65,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 52,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 45,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Nakupenda_Sandbank_01.jpg",
    "highlights": [
      "Cruise to Prison Island to feed the ancient Aldabra giant tortoises",
      "Spend the afternoon on the breathtaking vanishing Nakupenda sandbank",
      "Snorkel vibrant turquoise coral reefs with tropical fish and starfish",
      "Sumptuous beach buffet lunch of grilled lobster, jumbo prawns, and calamari",
      "Sunbathe and swim in 360-degree crystal-clear waters"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Prison Island Tortoises & Historical Quarantine",
        "activities": "Board a boat from Stone Town to Prison Island. Tour the tortoise sanctuary, learn about the island’s quarantine past, and photograph giant tortoises wandering the gardens.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Nakupenda Sandbank Cruise & Coral Snorkeling",
        "activities": "Sail across the azure waters to Nakupenda Sandbank. Unwind under a sunshade canopy, swim in warm crystalline waters, and snorkel over vibrant coral formations.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Buffet"
      },
      {
        "day": 3,
        "title": "Afternoon: Gourmet Beach Seafood Barbecue & Relax",
        "activities": "Indulge in a fresh seafood feast cooked on the sandbank: grilled lobster, calamari, prawns, and fish served with coconut rice. Relax in paradise before sailing back by 4:00 PM.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Seafood BBQ (Lobster, Prawns, Fish) & Fresh Fruits"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Private/shared boat transfers to Prison Island & Nakupenda",
      "Prison Island entry permits and tortoise sanctuary tickets",
      "Snorkeling gear (mask, snorkel, fins, life jackets)",
      "Gourmet grilled seafood lunch on the sandbank",
      "Unlimited bottled water and fresh fruit platters"
    ],
    "notIncluded": [
      "Gratuities",
      "Alcoholic drinks",
      "Travel insurance"
    ],
    "badge": "Island & Beach"
  },
  {
    "id": "zanzibar-full-day-traditional-cooking-class-local-market",
    "name": "Full Day - Traditional Cooking Class & Local Market",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (6-7 Hours)",
    "priceRange": "$55",
    "fromPrice": 55,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 95,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 55,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 45,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 38,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/FullDay_Traditional_Cooking_Class_Local_Market_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/FullDay_Traditional_Cooking_Class_Local_Market_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/FullDay_Traditional_Cooking_Class_Local_Market_01.jpg",
    "highlights": [
      "Shop like a local at vibrant Darajani Market with a Swahili chef",
      "Select fresh organic ingredients, exotic spices, and fresh seafood",
      "Hands-on cooking class in an authentic Swahili village kitchen",
      "Learn the secrets of Biryani, Pilau, Coconut Curry, and Chapati",
      "Feast together on your culinary creations accompanied by spiced tea"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Market Shopping at Darajani Bazaar",
        "activities": "Meet your Swahili culinary instructor in Stone Town. Walk through the bustling Darajani Market, selecting freshly caught fish, seasonal vegetables, coconut, and whole spices while learning their cultural names and cooking roles.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Hands-On Kitchen Preparation & Cooking Class",
        "activities": "Travel to an authentic open-air village kitchen. Grate fresh coconuts with a traditional wooden mbuzi, grind whole spices using mortar and pestle, knead dough for flaky chapati, and prepare authentic Swahili coconut fish curry and pilau.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Snacks & Spiced Zanzibari Tea"
      },
      {
        "day": 3,
        "title": "Afternoon: Communal Swahili Feast & Recipe Exchange",
        "activities": "Sit together Swahili-style to feast on the multi-course meal you helped create. Receive a printed recipe card booklet to recreate authentic Zanzibari dishes back home before returning to your hotel.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Self-Prepared 4-Course Swahili Gourmet Feast"
      }
    ],
    "included": [
      "Round-trip hotel transfers in Zanzibar",
      "Market shopping tour and all ingredient costs",
      "Professional Swahili chef instructor and cooking class facilities",
      "Multi-course lunch, spiced tea, and bottled water",
      "Keepsake Swahili recipe guide"
    ],
    "notIncluded": [
      "Tips for chef",
      "Personal shopping",
      "Travel insurance"
    ],
    "badge": "Culinary Masterclass"
  },
  {
    "id": "zanzibar-full-day-nungwi-kendwa-beach-experience",
    "name": "Full Day - Nungwi & Kendwa Beach Experience",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (8 Hours)",
    "priceRange": "$55",
    "fromPrice": 55,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 90,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 55,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 42,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 35,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Kendwa_Beach_Tour_02.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Nungwi_Beach_Tour_01.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Kendwa_Beach_Tour_02.jpg",
    "highlights": [
      "Experience the two most celebrated beaches in Zanzibar: Nungwi and Kendwa",
      "Swim in turquoise calm waters where tides never pull the ocean away",
      "Visit the Baraka Sea Turtle Conservation Sanctuary in Nungwi",
      "Watch traditional dhow craftsmen building wooden boats on the sand",
      "Beachside restaurant lunch and magical sunset view over Kendwa Bay"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Nungwi Boatyard & Sea Turtle Sanctuary",
        "activities": "Depart hotel at 9:00 AM heading to the northern tip. Tour the traditional dhow boat building yards, then visit Baraka Aquarium to feed and swim with rescued sea turtles in their natural rock lagoon.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Beachside Lunch & Swimming in Nungwi",
        "activities": "Enjoy a delicious oceanfront seafood lunch at a beach restaurant overlooking Nungwi’s vibrant shoreline. Free time to swim, walk the white sands, and explore local craft stalls.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Oceanfront Lunch"
      },
      {
        "day": 3,
        "title": "Afternoon: Kendwa Beach Relaxation & Sunset Celebration",
        "activities": "Head to adjacent Kendwa Beach, renowned for wide powdery sands and crystal calm waters. Relax on sun loungers, swim, or take optional watersports. Watch one of Africa’s most glorious sunsets before evening transfer.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Drinks & Refreshments"
      }
    ],
    "included": [
      "Private air-conditioned vehicle transfers",
      "Baraka Turtle Aquarium entrance ticket",
      "Lunch at an oceanfront beach restaurant",
      "Bottled drinking water and dedicated driver-guide"
    ],
    "notIncluded": [
      "Watersports rentals",
      "Alcoholic drinks",
      "Tips",
      "Travel insurance"
    ],
    "badge": "Beach & Sunset"
  },
  {
    "id": "zanzibar-full-day-jozani-forest-kuza-cave-blue-lagoon-the-rock",
    "name": "Full Day - Jozani Forest, Kuza Cave, Blue Lagoon & The Rock",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (8-9 Hours)",
    "priceRange": "$85",
    "fromPrice": 85,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 140,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 85,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 68,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 58,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/The_Rock_Restaurant_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/The_Rock_Restaurant_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/The_Rock_Restaurant_01.jpg",
    "highlights": [
      "The ultimate Southeast Zanzibar VIP adventure combining 4 top attractions",
      "Spot Red Colobus monkeys in Jozani National Park rainforest",
      "Swim in the crystal-clear subterranean freshwater pools of sacred Kuza Cave",
      "Snorkel with colorful starfish and tropical fish in the Blue Lagoon (Michamvi)",
      "Visit and photograph the legendary world-famous The Rock Restaurant"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Jozani Forest Red Colobus Monkeys",
        "activities": "Depart hotel early morning to Jozani National Park. Walk with a park ranger through ancient mahogany trees to observe the rare Red Colobus monkeys jumping in the canopy. Walk the mangrove boardwalk trail.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Mid-Morning: Swimming Inside Ancient Kuza Cave",
        "activities": "Drive to Jambiani to discover Kuza Cave, an ancient limestone cavern with sacred healing waters. Descend into the cool subterranean pool for a refreshing swim surrounded by natural stalactites.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Refreshments"
      },
      {
        "day": 3,
        "title": "Afternoon: Blue Lagoon Snorkeling & Starfish Garden",
        "activities": "Board a boat at Michamvi to snorkel the protected Blue Lagoon. Marvel at vibrant blue starfish, coral gardens, and tropical fish in warm, sheltered waters.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Beachfront Lunch"
      },
      {
        "day": 4,
        "title": "Late Afternoon: Iconic The Rock Restaurant Visit",
        "activities": "Conclude your tour at the world-famous The Rock Restaurant in Michamvi. Photograph the iconic structure rising out of the ocean, relax on the ocean deck with drinks, and watch the tide transform the landscape before transfer back to your hotel.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Water & Fresh Tropical Snacks"
      }
    ],
    "included": [
      "Round-trip private hotel transfers in Zanzibar",
      "Jozani National Park entry and ranger guide",
      "Kuza Cave entrance ticket and swimming permit",
      "Blue Lagoon boat ride and snorkeling gear",
      "Delicious beach lunch",
      "The Rock Restaurant visit assistance and bottled drinking water"
    ],
    "notIncluded": [
      "Drinks/food ordered at The Rock Restaurant",
      "Tips",
      "Travel insurance"
    ],
    "badge": "Ultimate Tour"
  },
  {
    "id": "zanzibar-full-day-sea-walk-tour",
    "name": "Full Day - Zanzibar Sea Walk Underwater Adventure",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (7 Hours)",
    "priceRange": "$90",
    "fromPrice": 90,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 145,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 90,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 75,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 65,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Zanzibar_Sea_Walk_Tour_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Zanzibar_Sea_Walk_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Zanzibar_Sea_Walk_Tour_01.jpg",
    "highlights": [
      "Walk literally on the ocean floor at 4 to 5 meters depth with a specialized helmet",
      "No scuba diving certification or swimming experience needed — breathe naturally!",
      "Hand-feed schools of tropical damselfish, sergeant majors, and clownfish",
      "Full underwater photo and video shoot included",
      "Combine with beach relaxation, snorkeling, and fresh seafood lunch"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Marine Safety Briefing & Pontoon Transfer",
        "activities": "Hotel pickup and transfer to the sea walk marine base. Board a speedboat to the anchored ocean pontoon. Put on a specialized high-tech diving helmet that pumps continuous fresh air, allowing you to breathe naturally without a mouthpiece while wearing glasses if needed.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Underwater Ocean Floor Walking Experience",
        "activities": "Step down a submerged ladder onto the ocean floor 4-5 meters below. Guided by professional safety divers, walk along a coral trail, feed schools of tropical fish by hand, and marvel at sea anemones and coral reefs while photographers record your experience.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Tropical Fruit Platter"
      },
      {
        "day": 3,
        "title": "Afternoon: Island Lunch & Beach Relaxation",
        "activities": "Return to the pontoon and shore for a freshly prepared seafood and Swahili lunch. Spend the remainder of the afternoon snorkeling or relaxing on the white sand beach before afternoon transfer back to your hotel.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Seafood Lunch & Soft Drinks"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Complete Sea Walk equipment, specialized air helmet, and dive briefing",
      "Professional PADI-trained safety dive team supervision",
      "Fresh seafood beach lunch, fruit platters, and bottled water",
      "Snorkeling gear for surface swimming"
    ],
    "notIncluded": [
      "Underwater photo/video package",
      "Gratuities",
      "Travel insurance"
    ],
    "badge": "Underwater Walk"
  },
  {
    "id": "zanzibar-full-day-jozani-forest-kayaking-adventures",
    "name": "Full Day - Jozani Forest & Mangrove Kayaking",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (7.5 Hours)",
    "priceRange": "$75",
    "fromPrice": 75,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 120,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 75,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 60,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 52,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Kayaking_Adventures_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Kayaking_Adventures_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Kayaking_Adventures_01.jpg",
    "highlights": [
      "Kayak through untouched mangrove waterways in Chwaka Bay Biosphere Reserve",
      "Spot kingfishers, herons, crabs, and juvenile fish in tranquil tidal channels",
      "Guided rainforest walk in Jozani National Park with Red Colobus monkeys",
      "Eco-friendly low-impact exploration of Zanzibar’s coastal wilderness",
      "Delicious local Swahili lunch at a beachfront lodge"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Jozani Forest Wildlife Guided Trek",
        "activities": "Morning departure to Jozani National Park. Accompanied by a naturalist ranger, walk beneath the lush canopy to encounter the rare Kirk’s Red Colobus monkeys, Sykes monkeys, and exotic plant species.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Guided Kayak Expedition in Mangrove Channels",
        "activities": "Transfer to Pete or Chwaka inlet. Receive lightweight paddles, life vests, and tandem or single kayaks. Paddle through tranquil, winding mangrove channels, learning about the crucial role of mangroves in coastal ecosystems.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Energy Snacks & Fruit Juices"
      },
      {
        "day": 3,
        "title": "Afternoon: Swahili Beachfront Lunch & Relaxation",
        "activities": "Paddle back to shore and enjoy a well-earned fresh Swahili lunch at a quiet beach lodge overlooking the bay. Relax on the beach before returning to your hotel by 4:30 PM.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Swahili Beach Lunch"
      }
    ],
    "included": [
      "Round-trip hotel transfers in Zanzibar",
      "Jozani National Park conservation entrance tickets",
      "Professional sea kayaks, lightweight paddles, and safety vests",
      "Experienced river/marine kayak guide",
      "Beachfront lunch, fruit snacks, and bottled water"
    ],
    "notIncluded": [
      "Tips for guides",
      "Personal expenses",
      "Travel insurance"
    ],
    "badge": "Eco Adventure"
  },
  {
    "id": "zanzibar-full-day-mnemba-snorkeling-nungwi-kendwa-beach",
    "name": "Full Day - Mnemba Snorkeling, Nungwi & Kendwa Beach",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (8 Hours)",
    "priceRange": "$75",
    "fromPrice": 75,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 120,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 75,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 60,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 52,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Mnemba_Dolphins_Snorkeling_Trip_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Kendwa_Beach_Tour_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Mnemba_Dolphins_Snorkeling_Trip_01.jpg",
    "highlights": [
      "Snorkel the world-class coral reefs of the protected Mnemba Island Atoll",
      "Spot wild resident dolphins leaping in the azure channel",
      "Feast on tropical fruits and fresh coconuts on board",
      "Afternoon beach relaxation at northern Zanzibar’s famous Kendwa and Nungwi beaches",
      "Spectacular sunset views over the Indian Ocean"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Boat Launch & Mnemba Atoll Snorkeling",
        "activities": "Early morning hotel pickup to the northeastern coast. Board a boat heading toward Mnemba Atoll. Encounter wild dolphins in their natural playground, followed by 2 hours of snorkeling above world-class coral reefs with colorful marine life.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Water & Tropical Fruit Platter"
      },
      {
        "day": 2,
        "title": "Midday: Beachside Lunch in Nungwi",
        "activities": "Cruise back to shore and travel to Nungwi. Enjoy a delicious fresh seafood lunch at an oceanfront restaurant with panoramic views of the turquoise sea.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Seafood Lunch"
      },
      {
        "day": 3,
        "title": "Afternoon: Kendwa Beach Relaxation & Sunset",
        "activities": "Spend the afternoon at Kendwa Beach swimming in calm waters, sunbathing on soft powder sand, or visiting beach cafes. Watch the golden African sunset before transfer back to your hotel.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Refreshments & Fruit Drinks"
      }
    ],
    "included": [
      "Round-trip hotel transfers in Zanzibar",
      "Boat cruise to Mnemba Atoll with professional captain",
      "All marine conservation entrance permits",
      "High-grade snorkeling equipment and life vests",
      "Fresh seafood lunch, tropical fruits, and bottled water"
    ],
    "notIncluded": [
      "Guide/crew tips",
      "Alcoholic drinks",
      "Travel insurance"
    ],
    "badge": "Reef & Beach"
  },
  {
    "id": "zanzibar-full-day-prison-island-bawe-island-snorkeling",
    "name": "Full Day - Prison Island & Bawe Island Snorkeling",
    "category": "Zanzibar",
    "subcategory": "Full Day Tours",
    "duration": "Full Day (7 Hours)",
    "priceRange": "$70",
    "fromPrice": 70,
    "rates": [
      {
        "pax": "Solo Traveler",
        "price": 115,
        "currency": "USD"
      },
      {
        "pax": "2 Persons",
        "price": 70,
        "currency": "USD"
      },
      {
        "pax": "4 Persons",
        "price": 58,
        "currency": "USD"
      },
      {
        "pax": "6+ Persons",
        "price": 50,
        "currency": "USD"
      }
    ],
    "image": "https://alulizanzibar.co.tz/images/Bawe_Island_Snorkeling_01.jpg",
    "hoverImage": "https://alulizanzibar.co.tz/images/Bawe_Island_Snorkeling_02.jpg",
    "coverImage": "https://alulizanzibar.co.tz/images/Bawe_Island_Snorkeling_01.jpg",
    "highlights": [
      "Cruise to historical Prison Island and interact with giant Aldabra tortoises",
      "Tour the colonial quarantine station and ruined hospital",
      "Sail over to secluded Bawe Island, renowned for Zanzibar’s finest shallow reefs",
      "Snorkel among staghorn corals, clownfish, parrotfish, and sea turtles",
      "Delicious grilled seafood picnic lunch served on the beach"
    ],
    "itinerary": [
      {
        "day": 1,
        "title": "Morning: Prison Island Tortoises & Historical Exploration",
        "activities": "Board a boat from Stone Town port heading to Prison Island. Feed the 100+ year-old giant tortoises, photograph peacocks, and explore the 1893 quarantine complex before cruising across the channel.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Bottled Mineral Water"
      },
      {
        "day": 2,
        "title": "Midday: Cruise to Bawe Island & Coral Reef Snorkeling",
        "activities": "Sail 15 minutes to Bawe Island, an untouched coral haven. Plunge into crystal clear turquoise waters to snorkel along vibrant coral walls packed with marine life, moray eels, and tropical reef fish.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Tropical Fruit Buffet"
      },
      {
        "day": 3,
        "title": "Afternoon: Beach Picnic Lunch & Return Sail",
        "activities": "Relax on Bawe’s powdery sand beach for a delicious grilled seafood lunch of fish, calamari, salad, and fresh tropical fruit before a gentle sail back to Stone Town by 4:00 PM.",
        "accommodation": "Your Zanzibar Hotel / Resort",
        "meals": "Fresh Grilled Seafood Lunch & Soft Drinks"
      }
    ],
    "included": [
      "Hotel pickup and drop-off in Zanzibar",
      "Roundtrip boat cruise to Prison Island & Bawe Island",
      "Prison Island entry permits and tortoise sanctuary tickets",
      "Quality snorkeling gear (mask, snorkel, fins, life jackets)",
      "Fresh grilled seafood lunch and tropical fruit platters",
      "Unlimited bottled drinking water"
    ],
    "notIncluded": [
      "Guide/boat crew tips",
      "Alcoholic drinks",
      "Travel insurance"
    ],
    "badge": "Two Islands"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    location: 'United Kingdom',
    text: 'The 5-day migration safari was life-changing. We saw a river crossing and the Big Five in just one trip. Our guide was incredibly knowledgeable!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '2',
    name: 'David Chen',
    location: 'Singapore',
    text: 'Perfectly organized. From the moment we landed in Arusha to our final day on the beaches of Zanzibar, everything was seamless.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '3',
    name: 'Emma & Mark',
    location: 'Australia',
    text: 'An unforgettable honeymoon! The private 3-day safari was intimate and adventurous. The luxury camps were better than five-star hotels.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80'
  }
];
