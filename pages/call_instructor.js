// ==== DISCORD CHANNEL PING ====
if (REPORT_CHANNEL_ID) {
  let roleToPing = "";

  if (testType === "radio") roleToPing = `<@&${INSTRUCTOR_RADIO}>`;
  if (testType === "mdt") roleToPing = `<@&${INSTRUCTOR_MDT}>`;
  if (testType === "academie") roleToPing = `<@&${TESTER_GENERAL}>`;

  const embed = {
    title: "Solicitare Instructor",
    description: "Un candidat solicită un instructor.",
    color: 16753920, // trebuie number
    fields: [
      {
        name: "Solicitant",
        value: ping.requester?.tag || "N/A",
      },
      {
        name: "Test",
        value: testType || "necunoscut",
      },
      {
        name: "Notă",
        value: (note && note.trim()) ? note.trim() : "—",
      },
      {
        name: "ID Ping",
        value: id,
      },
    ],
    timestamp: new Date().toISOString(), // IMPORTANT
  };

  await fetch(`https://discord.com/api/v10/channels/${REPORT_CHANNEL_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `${roleToPing} instructor necesar!`,
      embeds: [embed],
      allowed_mentions: {
        parse: ["roles"], // permite ping la rol
      },
    }),
  });
}
