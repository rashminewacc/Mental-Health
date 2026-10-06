import { MoodNeed, Story, CheckInEntry, NotificationItem } from '../types.ts';

export const MOOD_NEEDS: MoodNeed[] = [
  {
    key: 'encouragement',
    emoji: '🌱',
    label: 'I need encouragement',
    recommendationTitle: 'Warm Affirmation & Grounding',
    recommendationDesc: 'A 2-min reminder of your quiet resilience',
    exerciseDuration: '2 min',
    exerciseSteps: [
      'Take a deep breath and let your shoulders drop from your ears.',
      'Place one hand over your heart or stomach, noticing its steady warmth.',
      'Repeat gently: “I am doing the best I can with what I have right now, and that is worthy.”',
      'Notice any self-criticism and picture setting it down like a heavy bag upon a welcoming stone.',
      'Inhale confidence, exhale the expectation to have it all figured out.'
    ]
  },
  {
    key: 'anxious',
    emoji: '🌊',
    label: 'I feel anxious',
    recommendationTitle: '5-4-3-2-1 Sensory Anchor',
    recommendationDesc: 'Bring your thoughts back to this safe room',
    exerciseDuration: '3 min',
    exerciseSteps: [
      'Look around you: name 5 things you can see (the weave of a rug, a shadow, a cup).',
      'Name 4 things you can physically touch (your sweater, chair fabric, your hands).',
      'Name 3 sounds you can hear in this room or outside in the distance.',
      'Name 2 things you can smell or an aroma you find comforting.',
      'Name 1 thing you are grateful for right in this present heartbeat.'
    ]
  },
  {
    key: 'overwhelmed',
    emoji: '🍃',
    label: 'I feel overwhelmed',
    recommendationTitle: 'Gentle Exhale: 90-Second Reset',
    recommendationDesc: 'Unspool tension with lengthened sighs',
    exerciseDuration: '90 sec',
    exerciseSteps: [
      'Sit comfortably and let your eyes soften or close.',
      'Take a slow, effortless breath in through your nose for 4 counts.',
      'Part your lips and release a long, audible “haaa” sigh for 7 counts.',
      'Allow gravity to support your thighs, feet, and back completely.',
      'Remind yourself: You only have to do the next small, single thing.'
    ]
  },
  {
    key: 'lonely',
    emoji: '🕯️',
    label: 'I feel lonely',
    recommendationTitle: 'A Letter from a Quiet Friend',
    recommendationDesc: 'Short reflection on connection and presence',
    exerciseDuration: '2 min',
    exerciseSteps: [
      'Close your eyes and picture someone who has looked at you with kindness.',
      'If not a person, picture a beloved pet, an ancient tree, or the soft dawn light.',
      'Remember that across this city and world, millions of others are feeling this exact longing.',
      'You are woven into the shared human fabric. Solitude can become a sacred shelter.',
      'Place your arms gently around yourself in a comforting self-embrace.'
    ]
  },
  {
    key: 'stuck',
    emoji: '⛅',
    label: 'I feel stuck',
    recommendationTitle: 'Micro-Movement Invitation',
    recommendationDesc: 'Loosen shoulders and shift your inner space',
    exerciseDuration: '90 sec',
    exerciseSteps: [
      'Roll your shoulders up toward your ears, hold for 2 seconds, and let them drop.',
      'Gently turn your head side to side, letting your neck unwind.',
      'Open and close your fists slowly, feeling the blood flow into your palms.',
      'Take one tall stretch towards the ceiling as if greeting morning light.',
      'Drink a slow sip of water and celebrate shifting your physical state.'
    ]
  },
  {
    key: 'hopeful',
    emoji: '✨',
    label: 'I feel hopeful',
    recommendationTitle: 'Catch the Light: Gratitude Bead',
    recommendationDesc: 'Save this gentle spark in your memory nest',
    exerciseDuration: '2 min',
    exerciseSteps: [
      'Notice the subtle warmth or lightness in your chest.',
      'What small spark created this feeling today? A kind word? A quiet cup of tea?',
      'Let yourself savor this goodness for 30 full seconds without rushing away.',
      'Store this moment like a polished sea pebble in your heart’s pocket.',
      'Carry this gentle glow forward into the hours ahead.'
    ]
  }
];

export const STORIES: Story[] = [
  {
    id: 'forest-after-rain',
    title: 'The Forest After the Rain',
    category: 'Dawn Sanctuary',
    duration: '3 min read / audio',
    audioMinutes: 3,
    type: 'Audio & Text',
    tag: 'Generated for feeling overwhelmed',
    narrator: 'Elena',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArBO2s4V9jOc_aBXh2zIIpQK-d5y5oALjQqrepqZ2TA93NSUd0znhiEdFhh1RZ_vxeVtpANhXzyPtnGIGQRrLoUA9q_oV28uqQzjUeZ1Qm5V6poeD7gLHAG5T_pt0VzmOEigXJJaInLGTVTIvcjdU8GpjtxGMD_KSE6sm0yS5dd8Vr803_RT7QiuAJx2tuTwBp8qmZQ27l3F_cJBbzqJiLGYYmbGyTk8TZS24NSMtKGXb2iVxfc4BT',
    quote: '“The branches did not fight the deluge; they simply let the heavy droplets slide along their mossy bark, trusting the earth below to drink what was too heavy to hold.”',
    excerpt: 'An ethereal, peaceful misty woodland glade just after rainfall. Soft diffuse morning sunlight pierces through canopy mist onto moss-covered ancient bark, damp fern leaves with glimmering water droplets.',
    content: [
      'The storm arrived without invitation, bending the highest crowns of the pine and alder. For hours, gray sheets of sky descended in relentless cascades.',
      'Yet deep down near the roots, there was no panic. The ancient trees had witnessed thousands of storms before this one.',
      'They did not tense their fibers to resist the water; they welcomed it. Every leaf tipped downward in gentle humility, guiding the rain in sparkling streams along rough channels of bark down to the rich soil beneath.',
      'Now, as the clouds begin to part, a gentle golden hue illuminates the rising vapor. The air smells of damp pine needles, rich loam, and newborn silence.',
      'You, too, have carried a heavy downpour lately. But like the elder trees, you do not have to cling to what falls upon you. Let the heavy thoughts roll off like droplets. The earth is wide enough to hold it all for you.'
    ]
  },
  {
    id: 'mountain-river',
    title: 'The Mountain and the River',
    category: 'Grounding & Release',
    duration: '4 min read / audio',
    audioMinutes: 4,
    type: 'Audio & Text',
    tag: 'For soothing anxious thoughts',
    narrator: 'Kieran',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    quote: '“The river does not debate the stones in its path; it simply rounds their edges with patient, shimmering water.”',
    excerpt: 'A winding glacial stream through granite mountain passes, illuminated by twilight pinks and alpine breeze.',
    content: [
      'High above the valley floor, the great granite ridge stands immovable against the changing winds.',
      'At its base flows a cold, crystal-clear glacial river. It never stops to ask whether it has enough strength for the next turn.',
      'When a boulder falls in the river’s course, it does not argue or fret. It sings softly around the obstacle, polishing rough stone into smooth marble over years of tender companionship.',
      'When your mind feels crowded with obstacles, remember that you are both the mountain—unshakable at your center—and the river that knows how to flow around the bends.',
      'Rest here by the bank. Feel the coolness of the water against your fingertips. Everything is unfolding in its own quiet rhythm.'
    ]
  },
  {
    id: 'lantern-still-water',
    title: 'Lanterns on Calm Waters',
    category: 'Evening Unwind',
    duration: '5 min read / audio',
    audioMinutes: 5,
    type: 'Audio & Text',
    tag: 'For night rest and sleep',
    narrator: 'Mei',
    imageUrl: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
    quote: '“As night falls, the lake mirrors the stars, holding the vastness of heaven without creating a single ripple.”',
    excerpt: 'Gentle dusk over a mirrored mountain lake, soft paper lanterns floating into the tranquil blue mist.',
    content: [
      'The sun has dipped behind the Western hills, leaving behind a gradient of peach, indigo, and deep twilight violet.',
      'On the shore of the still water, a wooden lantern is gently placed upon the mirrored surface.',
      'Its small candle casts a warm amber halo across the obsidian water. It drifts slowly with the imperceptible current, completely safe, completely untroubled by where the night leads.',
      'You have worked enough today. You have thought enough thoughts. Let your responsibilities drift outward like that gentle lantern.',
      'Close your eyes now. Breathe with the rhythm of the gentle tide against the dock.'
    ]
  }
];

export const INITIAL_CHECKINS: CheckInEntry[] = [
  {
    id: 'c-1',
    date: 'Yesterday, 8:45 PM',
    time: '8:45 PM',
    mood: 'Grounded & Soft',
    moodEmoji: '🌿',
    energyLevel: 4,
    tensionPoints: ['Shoulders released'],
    note: 'Let go of the need to respond to late emails. Took a warm cup of chamomile tea.',
    affirmation: 'Peace is my natural state when I stop rushing.'
  },
  {
    id: 'c-2',
    date: 'Oct 22, 9:15 AM',
    time: '9:15 AM',
    mood: 'Reflective',
    moodEmoji: '⛅',
    energyLevel: 3,
    tensionPoints: ['Chest tight'],
    note: 'Feeling a bit behind on deadlines, but reminding myself that today has its own grace.',
    affirmation: 'One step at a time is still sacred progress.'
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'Dawn Sanctuary is Open',
    message: 'Good morning Maya. Take 2 minutes to listen to your morning forest pulse.',
    time: '8:00 AM',
    unread: true,
    type: 'dawn'
  },
  {
    id: 'n-2',
    title: 'Story Edition Available',
    message: '“The Forest After the Rain” was curated for your recent overwhelmed state.',
    time: '7:30 AM',
    unread: true,
    type: 'story'
  },
  {
    id: 'n-3',
    title: 'Yesterday’s Grounding Completed',
    message: 'You took 4 minutes of box breathing yesterday. Your streak continues.',
    time: 'Yesterday',
    unread: false,
    type: 'insight'
  }
];
