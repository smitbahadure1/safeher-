import {
  BookOpen,
  ShieldAlert,
  HeartPulse,
  Users,
  Smartphone,
  ExternalLink,
} from "lucide-react";

export default function Resources() {
  const categories = [
    {
      title: "Emergency",
      icon: <ShieldAlert size={20} />,
      colorClass: "icon-red",
      items: [
        {
          title: "National Emergency Number",
          desc: "Dial 112 for all emergencies in India.",
        },
        {
          title: "Local Police Information",
          desc: "Understand how to file an FIR or zero FIR.",
        },
      ],
    },
    {
      title: "Medical",
      icon: <HeartPulse size={20} />,
      colorClass: "icon-blue",
      items: [
        {
          title: "First Aid Basics",
          desc: "Basic first aid knowledge for emergencies.",
        },
        {
          title: "24/7 Pharmacies",
          desc: "How to locate night pharmacies in your city.",
        },
      ],
    },
    {
      title: "Support",
      icon: <Users size={20} />,
      colorClass: "icon-purple",
      items: [
        {
          title: "Women's Help Desks",
          desc: "Information about local police station women's desks.",
        },
        {
          title: "Legal Rights",
          desc: "Basic information about your legal rights regarding harassment.",
        },
      ],
    },
    {
      title: "Digital Safety",
      icon: <Smartphone size={20} />,
      colorClass: "icon-green",
      items: [
        {
          title: "Online Harassment",
          desc: "Steps to take if facing cyberstalking or harassment.",
        },
        {
          title: "Privacy Settings",
          desc: "Securing your social media accounts and location data.",
        },
      ],
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <BookOpen size={24} className="text-primary" /> Safety Resources
        </h1>
        <p className="text-sm text-secondary mt-1">
          Factual information and guides for your safety.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="card p-0 overflow-hidden">
            <div className="p-4 border-b bg-gray-50 flex items-center gap-3">
              <div className={`p-2 rounded-lg ${cat.colorClass}`}>
                {cat.icon}
              </div>
              <h2 className="font-bold">{cat.title}</h2>
            </div>
            <div className="flex flex-col">
              {cat.items.map((item, itemIdx) => (
                <div
                  key={itemIdx}
                  className="p-4 border-b last:border-0 flex justify-between items-center group cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-secondary">{item.desc}</p>
                  </div>
                  <ExternalLink
                    size={16}
                    className="text-gray-300 group-hover:text-primary transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
