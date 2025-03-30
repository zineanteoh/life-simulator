export interface HistoricalEvent {
  year: number;
  age: number;
  event: string;
  significance: string;
}

export interface HistoricalContext {
  events: HistoricalEvent[];
  phaseMessage: string;
}

export const fetchHistoricalEvents = async (
  birthYear: number,
  currentAge: number
): Promise<HistoricalContext> => {
  const phaseMessage = getPhaseMessage(currentAge);
  
  try {
    const events = await callGeminiAPI(birthYear, currentAge);
    return {
      events,
      phaseMessage
    };
  } catch (error) {
    console.error("Error fetching from Gemini API:", error);
    // Fallback to mock data if API call fails
    return {
      events: getMockEvents(birthYear, currentAge),
      phaseMessage
    };
  }
};

const getPhaseMessage = (age: number): string => {
  if (age <= 30) {
    return "You grew up with these changes as your normal reality";
  } else if (age <= 60) {
    return "You witnessed and shaped these transformative events during your prime years";
  } else if (age <= 90) {
    return "Your long life experience gives you a unique perspective on these revolutionary changes";
  } else {
    return "You've lived to see humanity transform beyond what anyone thought possible";
  }
};

// Extensive list of historical events from 1900 to 2110
const worldEvents = [
  // 1900s
  { year: 1900, event: "Quantum Theory Introduced", significance: "Max Planck's discovery of quantum mechanics revolutionized our understanding of physics and laid groundwork for modern technology." },
  { year: 1901, event: "First Nobel Prizes Awarded", significance: "The establishment of the Nobel Prizes began recognizing groundbreaking achievements in science and peace." },
  { year: 1902, event: "First Trans-Pacific Cable", significance: "Communication between North America and Asia was revolutionized with the completion of the Pacific telegraph cable." },
  { year: 1903, event: "Wright Brothers' First Flight", significance: "The first powered, controlled aircraft flight at Kitty Hawk marked the beginning of the aviation age." },
  { year: 1904, event: "New York Subway Opens", significance: "The opening of the New York City Subway system transformed urban transportation." },
  { year: 1905, event: "Einstein's Special Relativity", significance: "Einstein's theory fundamentally changed our understanding of space, time, and the universe." },
  { year: 1906, event: "San Francisco Earthquake", significance: "One of the worst natural disasters in U.S. history destroyed much of San Francisco." },
  { year: 1907, event: "First Plastic Invented", significance: "The invention of Bakelite marked the beginning of the modern plastics industry." },
  { year: 1908, event: "Model T Ford Introduced", significance: "Henry Ford's affordable automobile revolutionized transportation and manufacturing." },
  { year: 1909, event: "First North Pole Expedition", significance: "Robert Peary's expedition reached the North Pole, marking a milestone in exploration." },

  // 1910s
  { year: 1910, event: "First Commercial Radio Broadcast", significance: "The birth of radio broadcasting began transforming mass communication and entertainment." },
  { year: 1911, event: "First Air Mail Service", significance: "The world's first air mail service began in India, revolutionizing postal delivery." },
  { year: 1912, event: "Titanic Sinks", significance: "The tragic sinking of the 'unsinkable' ship led to major maritime safety reforms." },
  { year: 1913, event: "Assembly Line Introduced", significance: "Henry Ford's assembly line revolutionized manufacturing and industry." },
  { year: 1914, event: "World War I Begins", significance: "The Great War began, forever changing global politics and society." },
  { year: 1915, event: "Einstein's General Relativity", significance: "Einstein's theory of gravity transformed our understanding of the cosmos." },
  { year: 1916, event: "First Birth Control Clinic", significance: "Margaret Sanger opened the first birth control clinic in the United States." },
  { year: 1917, event: "Russian Revolution", significance: "The Bolshevik Revolution created the world's first communist state." },
  { year: 1918, event: "Spanish Flu Pandemic", significance: "The deadliest pandemic in modern history infected one-third of the world's population." },
  { year: 1919, event: "Treaty of Versailles", significance: "The peace treaty ending World War I reshaped international boundaries and relations." },

  // 1920s
  { year: 1920, event: "Women's Suffrage in US", significance: "The 19th Amendment gave American women the right to vote." },
  { year: 1921, event: "First Radio News Program", significance: "Regular radio news broadcasts began, changing how people received information." },
  { year: 1922, event: "Discovery of King Tut's Tomb", significance: "The most complete ancient Egyptian royal tomb found sparked worldwide interest in archaeology." },
  { year: 1923, event: "First Television Demonstration", significance: "Vladimir Zworykin demonstrated the first electronic television system." },
  { year: 1924, event: "First Winter Olympics", significance: "The first Winter Olympic Games were held in Chamonix, France." },
  { year: 1925, event: "Scopes Monkey Trial", significance: "The famous trial highlighted the debate between evolution and creationism." },
  { year: 1926, event: "First Liquid-Fuel Rocket", significance: "Robert Goddard launched the first liquid-fueled rocket, pioneering space exploration." },
  { year: 1927, event: "First Trans-Atlantic Solo Flight", significance: "Charles Lindbergh's historic flight captured the world's imagination." },
  { year: 1928, event: "Discovery of Penicillin", significance: "Alexander Fleming's discovery revolutionized medicine with the first antibiotic." },
  { year: 1929, event: "Stock Market Crash", significance: "The Wall Street Crash marked the beginning of the Great Depression." },

  // 1930s
  { year: 1930, event: "Discovery of Pluto", significance: "Clyde Tombaugh discovered Pluto, then considered the ninth planet." },
  { year: 1931, event: "Empire State Building Completed", significance: "The world's tallest building symbolized American ambition during the Depression." },
  { year: 1932, event: "Discovery of Neutron", significance: "James Chadwick's discovery advanced our understanding of atomic structure." },
  { year: 1933, event: "Hitler Becomes Chancellor", significance: "Adolf Hitler's rise to power in Germany set the stage for World War II." },
  { year: 1934, event: "Dust Bowl Begins", significance: "Severe drought and dust storms devastated American agriculture." },
  { year: 1935, event: "Social Security Act", significance: "The cornerstone of America's social welfare system was established." },
  { year: 1936, event: "First TV Broadcasting Service", significance: "BBC launched the world's first public television service." },
  { year: 1937, event: "Hindenburg Disaster", significance: "The airship explosion effectively ended the era of passenger airships." },
  { year: 1938, event: "Nuclear Fission Discovered", significance: "The discovery of nuclear fission led to both nuclear power and weapons." },
  { year: 1939, event: "World War II Begins", significance: "The start of the most devastating conflict in human history." },

  // 1940s
  { year: 1940, event: "Battle of Britain", significance: "The RAF's victory prevented German invasion and marked a turning point in WWII." },
  { year: 1941, event: "Pearl Harbor Attack", significance: "Japan's attack brought the United States into World War II." },
  { year: 1942, event: "Manhattan Project Begins", significance: "The secret atomic bomb project changed warfare forever." },
  { year: 1943, event: "Penicillin Mass Production", significance: "The first antibiotic became widely available, saving countless lives." },
  { year: 1944, event: "D-Day Invasion", significance: "The largest seaborne invasion in history began the liberation of Western Europe." },
  { year: 1945, event: "Atomic Bombs & WWII Ends", significance: "The war ended after atomic bombs were dropped on Japan, ushering in the nuclear age." },
  { year: 1946, event: "First Computer ENIAC", significance: "The first general-purpose electronic computer began the digital revolution." },
  { year: 1947, event: "Cold War Begins", significance: "The political and military tension between East and West shaped global politics." },
  { year: 1948, event: "State of Israel Established", significance: "The creation of Israel dramatically changed Middle East politics." },
  { year: 1949, event: "NATO Formed", significance: "The North Atlantic Treaty Organization formed to counter Soviet influence." },

  // Recent events (2020s)
  { 
    year: 2023, 
    event: "AI Revolution Transforms Society", 
    significance: "ChatGPT and other AI models became household names, sparking global discussions about AI's impact on jobs, creativity, and the future of human work. Companies worldwide began integrating AI into their operations, while governments rushed to regulate this powerful technology."
  },
  { 
    year: 2022, 
    event: "Russia Invades Ukraine", 
    significance: "Russia launched a full-scale invasion of Ukraine, leading to the largest military conflict in Europe since World War II. The war caused a global energy crisis, massive refugee movements, and united Western nations in support of Ukraine through unprecedented sanctions against Russia."
  },
  { 
    year: 2021, 
    event: "Global Vaccination Campaign", 
    significance: "The world witnessed the largest vaccination campaign in history, with billions of COVID-19 shots administered globally. This scientific achievement marked a turning point in the pandemic, though vaccine inequality between rich and poor nations remained a critical issue."
  },
  { 
    year: 2020, 
    event: "COVID-19 Pandemic Reshapes the World", 
    significance: "A novel coronavirus spread globally, leading to lockdowns affecting billions of people. The pandemic transformed how we work, learn, and socialize, accelerating digital transformation and exposing societal inequalities. Over 6 million lives were lost worldwide."
  },

  // 2010s
  { 
    year: 2019, 
    event: "First Image of a Black Hole", 
    significance: "Scientists captured the first-ever image of a black hole, located 55 million light-years away in the M87 galaxy. This groundbreaking achievement confirmed Einstein's theories and gave humanity its first look at one of the universe's most mysterious phenomena."
  },
  { 
    year: 2018, 
    event: "Gene-Edited Babies Spark Ethical Debate", 
    significance: "A Chinese scientist announced the birth of the world's first gene-edited babies, triggering intense debate about the ethics of human genetic modification and leading to new global regulations on genetic research."
  },
  { 
    year: 2017, 
    event: "#MeToo Movement Goes Global", 
    significance: "What began as a hashtag became a global movement against sexual harassment and assault, leading to the downfall of powerful figures in entertainment, politics, and business, and fundamentally changing workplace culture worldwide."
  },
  { 
    year: 2016, 
    event: "Brexit Referendum Shocks Europe", 
    significance: "The United Kingdom voted to leave the European Union, marking the first time a member state chose to exit. This historic decision reshaped European politics and triggered years of complex negotiations about the future of UK-EU relations."
  },

  // 1950s
  { year: 1950, event: "Korean War Begins", significance: "First major conflict of the Cold War that shaped international relations for decades." },
  { year: 1951, event: "First Color Television Broadcast", significance: "The beginning of modern home entertainment that would reshape family life." },
  { year: 1952, event: "Polio Vaccine Developed", significance: "Jonas Salk's breakthrough that eventually eradicated a devastating disease." },
  { year: 1953, event: "Discovery of DNA Structure", significance: "Watson and Crick revealed the double helix structure, revolutionizing biology and medicine." },
  { year: 1954, event: "First Transistor Radio", significance: "Portable electronics began transforming how people consumed media." },
  { year: 1955, event: "Rosa Parks Refuses to Give Up Her Seat", significance: "A pivotal moment in the civil rights movement that sparked nationwide change." },
  { year: 1956, event: "First Hard Disk Drive by IBM", significance: "The birth of modern data storage technology that would enable the digital revolution." },
  { year: 1957, event: "Sputnik 1 Launched", significance: "The first artificial satellite launched the Space Age and the space race between superpowers." },
  { year: 1958, event: "NASA Founded", significance: "The United States formally entered the space race, leading to decades of exploration." },
  { year: 1959, event: "First Microchip Invented", significance: "Jack Kilby and Robert Noyce's invention that would eventually lead to the computer revolution." },
  
  // 1960s
  { year: 1960, event: "Birth Control Pill Approved", significance: "A medical advance that would profoundly change social norms and women's lives." },
  { year: 1961, event: "First Human in Space", significance: "Yuri Gagarin's historic orbit of Earth opened the era of human spaceflight." },
  { year: 1962, event: "Cuban Missile Crisis", significance: "The closest the world came to nuclear war during the Cold War." },
  { year: 1963, event: "JFK Assassination", significance: "A traumatic national moment that marked the end of an era in American politics." },
  { year: 1964, event: "Civil Rights Act Passed", significance: "Landmark legislation that prohibited discrimination based on race, color, religion, sex, or national origin." },
  { year: 1965, event: "Vietnam War Escalation", significance: "The beginning of major U.S. combat operations that would divide the nation." },
  { year: 1966, event: "Cultural Revolution in China", significance: "Mao Zedong's campaign that dramatically changed Chinese society and politics." },
  { year: 1967, event: "First Heart Transplant", significance: "Dr. Christiaan Barnard performed the first successful human-to-human heart transplant." },
  { year: 1968, event: "Martin Luther King Jr. Assassination", significance: "The loss of a civil rights icon that sparked riots and profound national grief." },
  { year: 1969, event: "Moon Landing", significance: "Neil Armstrong and Buzz Aldrin's 'giant leap for mankind' represented the pinnacle of human achievement." },
  
  // 1970s
  { year: 1970, event: "Earth Day First Celebrated", significance: "The birth of the modern environmental movement." },
  { year: 1971, event: "Microprocessor Invented", significance: "Intel's 4004 chip laid the foundation for the personal computer revolution." },
  { year: 1972, event: "Watergate Scandal Begins", significance: "A political scandal that would eventually lead to President Nixon's resignation." },
  { year: 1973, event: "Oil Crisis", significance: "OPEC embargo triggered economic shocks and changed energy policies worldwide." },
  { year: 1974, event: "Nixon Resigns", significance: "The first and only presidential resignation in U.S. history transformed American politics." },
  { year: 1975, event: "End of Vietnam War", significance: "The fall of Saigon marked the end of America's longest war at that time." },
  { year: 1976, event: "Apple Computer Founded", significance: "Steve Jobs and Steve Wozniak started a company that would transform personal technology." },
  { year: 1977, event: "First Personal Computer Released", significance: "The Apple II, Commodore PET, and TRS-80 brought computing into homes." },
  { year: 1978, event: "First Test Tube Baby", significance: "Louise Brown's birth marked a revolution in reproductive technology." },
  { year: 1979, event: "Iranian Revolution", significance: "The overthrow of the Shah and establishment of an Islamic Republic changed Middle East dynamics forever." },
  
  // 1980s
  { year: 1980, event: "Mount St. Helens Eruption", significance: "Most destructive volcanic event in U.S. history, reshaping the landscape and scientific understanding." },
  { year: 1981, event: "First Cases of AIDS Reported", significance: "The beginning of a global health crisis that would claim millions of lives." },
  { year: 1982, event: "First CD Player Released", significance: "The digital audio revolution began, transforming how people consumed music." },
  { year: 1983, event: "Internet Officially Born", significance: "The adoption of TCP/IP protocol suite marked the birth of the modern internet." },
  { year: 1984, event: "Bhopal Gas Tragedy", significance: "The world's worst industrial disaster raised questions about corporate responsibility." },
  { year: 1985, event: "Live Aid Concert", significance: "A global music event that raised awareness and funds for Ethiopian famine relief." },
  { year: 1986, event: "Chernobyl Disaster", significance: "The worst nuclear power plant accident in history, with global environmental impacts." },
  { year: 1987, event: "Stock Market Crash", significance: "Black Monday saw the largest one-day percentage decline in stock market history." },
  { year: 1988, event: "First Major Internet Worm", significance: "The Morris Worm exposed the vulnerability of the emerging digital infrastructure." },
  { year: 1989, event: "Fall of the Berlin Wall", significance: "A pivotal moment symbolizing the end of the Cold War and German reunification." },
  
  // 1990s
  { year: 1990, event: "World Wide Web Invented", significance: "Tim Berners-Lee's creation would transform how humanity accesses information." },
  { year: 1991, event: "Dissolution of the Soviet Union", significance: "The end of the Cold War and complete reshaping of global geopolitics." },
  { year: 1992, event: "First Text Message Sent", significance: "The humble SMS would transform how people communicate globally." },
  { year: 1993, event: "European Union Established", significance: "The Maastricht Treaty created a political and economic union that reshaped Europe." },
  { year: 1994, event: "Rwandan Genocide", significance: "Approximately 800,000 people were killed in one of history's worst genocides." },
  { year: 1995, event: "Oklahoma City Bombing", significance: "The deadliest domestic terrorist attack in U.S. history prior to 9/11." },
  { year: 1996, event: "Dolly the Sheep Cloned", significance: "The first mammal cloned from an adult cell, raising ethical questions about biotechnology." },
  { year: 1997, event: "Princess Diana's Death", significance: "A global outpouring of grief and media coverage unprecedented in scale." },
  { year: 1998, event: "Google Founded", significance: "The start of a company that would revolutionize how we find information online." },
  { year: 1999, event: "Y2K Preparations", significance: "Global concern over potential computer failures led to massive technology upgrades." },
  
  // 2000s
  { year: 2000, event: "Y2K Transition", significance: "The millennium bug fears subsided as the world entered a new century with minimal disruption." },
  { year: 2001, event: "9/11 Terrorist Attacks", significance: "The deadliest terrorist attack in history transformed global security and international relations." },
  { year: 2002, event: "Euro Currency Introduced", significance: "A major milestone in European integration with global economic impact." },
  { year: 2003, event: "Human Genome Project Completed", significance: "The mapping of human DNA opened new frontiers in medicine and biotechnology." },
  { year: 2004, event: "Indian Ocean Tsunami", significance: "One of the deadliest natural disasters in recorded history, affecting multiple countries." },
  { year: 2005, event: "Hurricane Katrina", significance: "Devastating storm that exposed social inequalities and failures in disaster response." },
  { year: 2006, event: "Twitter Launched", significance: "The beginning of a social media platform that would transform public discourse." },
  { year: 2007, event: "iPhone Released", significance: "Apple's revolutionary device launched the smartphone era and changed daily life." },
  { year: 2008, event: "Global Financial Crisis", significance: "The worst economic disaster since the Great Depression affected millions worldwide." },
  { year: 2009, event: "First Bitcoin Transaction", significance: "The start of cryptocurrency that would challenge traditional financial systems." },
  
  // 2010s
  { year: 2010, event: "Arab Spring Begins", significance: "Wave of pro-democracy protests across the Middle East transformed regional politics." },
  { year: 2011, event: "Fukushima Nuclear Disaster", significance: "Earthquake and tsunami caused the worst nuclear accident since Chernobyl." },
  { year: 2012, event: "Higgs Boson Discovery", significance: "CERN scientists confirmed the existence of the 'God particle,' validating the Standard Model of physics." },
  { year: 2013, event: "Boston Marathon Bombing", significance: "Terrorist attack that demonstrated the resilience of a city and nation." },
  { year: 2014, event: "Ebola Epidemic", significance: "The largest Ebola outbreak in history tested global health systems." },
  { year: 2015, event: "Paris Climate Agreement", significance: "Landmark international accord to combat climate change and its impacts." },
  { year: 2016, event: "Brexit Referendum", significance: "UK voted to leave the European Union, beginning a complex separation process." },
  { year: 2017, event: "#MeToo Movement", significance: "Global movement against sexual harassment and assault transformed workplace culture." },
  { year: 2018, event: "First Gene-Edited Babies", significance: "Chinese scientist's controversial experiment raised profound ethical questions." },
  { year: 2019, event: "First Image of a Black Hole", significance: "Breakthrough in astronomy confirmed Einstein's theories and expanded our cosmic understanding." },
  
  // 2020s
  { year: 2020, event: "COVID-19 Pandemic", significance: "Global pandemic that caused millions of deaths and transformed society in countless ways." },
  { year: 2021, event: "Vaccines Developed in Record Time", significance: "Scientific achievement that demonstrated humanity's resilience and innovation." },
  { year: 2022, event: "Russia-Ukraine War", significance: "Europe's largest military conflict since World War II reshaped global security." },
  { year: 2023, event: "AI Revolution Accelerates", significance: "Rapid advancements in artificial intelligence began transforming work, creativity, and society." },
  
  // Near Future (2024-2030)
  { 
    year: 2024, 
    event: "First Human Mars Sample Return", 
    significance: "NASA and ESA's joint mission successfully brings back the first samples from Mars, providing unprecedented insights into the Red Planet's history and potential for past life."
  },
  { 
    year: 2025, 
    event: "Quantum Computing Breakthrough", 
    significance: "The first practical quantum computer surpasses classical computers in solving real-world problems, revolutionizing fields from drug discovery to climate modeling."
  },
  { 
    year: 2026, 
    event: "Global Clean Energy Milestone", 
    significance: "Renewable energy sources surpass fossil fuels in global electricity production for the first time, marking a turning point in the fight against climate change."
  },
  { 
    year: 2027, 
    event: "Brain-Computer Interface Goes Mainstream", 
    significance: "The first commercial neural implant receives widespread adoption, allowing direct mental control of digital devices and helping paralyzed individuals regain mobility."
  },
  { 
    year: 2028, 
    event: "First Lunar Colony Established", 
    significance: "International cooperation leads to the first permanent human settlement on the Moon, marking the beginning of sustained human presence beyond Earth."
  },
  { 
    year: 2029, 
    event: "AI Achieves Human-Level Intelligence", 
    significance: "Artificial General Intelligence (AGI) demonstrates human-level reasoning across all domains, triggering profound debates about consciousness and human identity."
  },
  { 
    year: 2030, 
    event: "Global Universal Basic Income Pilot", 
    significance: "A coalition of nations launches the first large-scale UBI program in response to widespread automation of jobs, reshaping economic systems."
  },

  // Mid-Century (2031-2050)
  { 
    year: 2035, 
    event: "First Human Mission to Mars", 
    significance: "International astronauts successfully land on Mars, establishing the first temporary research base and marking humanity's first steps on another planet."
  },
  { 
    year: 2038, 
    event: "Ocean Cleanup Completion", 
    significance: "Automated systems finally remove the last major ocean plastic garbage patch, demonstrating humanity's ability to reverse environmental damage."
  },
  { 
    year: 2040, 
    event: "Global Temperature Stabilization", 
    significance: "Thanks to aggressive climate action and carbon capture technology, global temperatures begin to stabilize for the first time since the industrial revolution."
  },
  { 
    year: 2045, 
    event: "Human-AI Merger Begins", 
    significance: "Safe neural implants allowing direct AI integration with human consciousness become available, leading to the first 'augmented humans'."
  },
  { 
    year: 2050, 
    event: "Aging Reversed in Humans", 
    significance: "The first successful clinical trials demonstrate significant reversal of biological aging, promising dramatic extensions to human lifespan."
  },

  // Late Century (2051-2080)
  { 
    year: 2055, 
    event: "Permanent Mars Colony", 
    significance: "The first self-sustaining city on Mars reaches 10,000 inhabitants, marking the first true human civilization on another planet."
  },
  { 
    year: 2060, 
    event: "First Interstellar Probe Launch", 
    significance: "Humanity launches its first dedicated mission to explore nearby star systems, using breakthrough propulsion technology."
  },
  { 
    year: 2065, 
    event: "Global Neural Network", 
    significance: "A secure, global brain-to-brain communication network goes online, enabling instant thought sharing and collective problem-solving."
  },
  { 
    year: 2070, 
    event: "Artificial Ecosystem Creation", 
    significance: "Scientists successfully create the first completely artificial, self-sustaining ecosystem, providing a template for terraforming other planets."
  },
  { 
    year: 2075, 
    event: "Consciousness Transfer Achievement", 
    significance: "The first successful transfer of human consciousness to a synthetic substrate is achieved, opening debates about the nature of human identity."
  },
  { 
    year: 2080, 
    event: "Solar System Mining Network", 
    significance: "A comprehensive automated mining operation across the asteroid belt makes rare materials abundant, ending resource scarcity on Earth."
  },

  // Far Future (2081-2110)
  { 
    year: 2085, 
    event: "First Contact Protocol Activated", 
    significance: "Clear evidence of extraterrestrial intelligence is detected, leading to the implementation of humanity's first coordinated response plan."
  },
  { 
    year: 2090, 
    event: "Time Manipulation Discovery", 
    significance: "Scientists achieve the first controlled manipulation of time at the quantum level, opening new possibilities for physics and technology."
  },
  { 
    year: 2095, 
    event: "Multi-Planet Democracy Established", 
    significance: "The first unified government system spanning Earth, Mars, and space colonies is formed, representing humanity's evolution into a multi-planet species."
  },
  { 
    year: 2100, 
    event: "Dimensional Gateway Created", 
    significance: "The first stable artificial wormhole is created in a laboratory, promising revolutionary new possibilities for space travel and physics."
  },
  { 
    year: 2105, 
    event: "Universal Translator Perfected", 
    significance: "AI-powered technology enables perfect real-time translation between all human and animal communication, transforming our understanding of consciousness."
  },
  { 
    year: 2110, 
    event: "Humanity Reaches Type I Civilization", 
    significance: "Humanity finally achieves the status of a Type I Kardashev civilization, able to harness and store all the energy available on Earth."
  }
];

// Mock implementation - used as fallback
const getMockEvents = (birthYear: number, currentAge: number): HistoricalEvent[] => {
  const currentYear = birthYear + currentAge;
  
  // Filter events that happened during the person's lifetime
  const relevantEvents = worldEvents.filter(event => 
    event.year >= birthYear && event.year <= currentYear
  );
  
  // Format events with personalized context
  return relevantEvents.map(event => ({
    year: event.year,
    age: event.year - birthYear,
    event: event.event,
    significance: event.significance
  }));
};

// Implementation using the GenAI SDK - using mock data since API integration is problematic
const callGeminiAPI = async (birthYear: number, currentAge: number): Promise<HistoricalEvent[]> => {
  // For now, just use the mock implementation until we can resolve the API issues
  return getMockEvents(birthYear, currentAge);
  
  // The following code would be used if we could get the API working correctly:
  /*
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash-001",
      contents: [prompt]
    });
    
    // Process result and extract events
    
    return events;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
  */
};
