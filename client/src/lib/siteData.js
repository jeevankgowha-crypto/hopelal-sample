import { useEffect, useState } from "react";
import { getSiteDoctors, getSiteSettings } from "./api";
import { doctors, hospital } from "./data";

export function useSiteSettings() {
  const [settings, setSettings] = useState(hospital);

  useEffect(() => {
    getSiteSettings().then(({ data }) => {
      if (!data) return;
      setSettings({
        name: data.hospitalName || hospital.name,
        phone: data.phone || hospital.phone,
        email: data.email || hospital.email,
        whatsapp: data.whatsapp || hospital.whatsapp,
        address: data.address || hospital.address,
        mapEmbedUrl: data.mapEmbedUrl
      });
    }).catch(() => {});
  }, []);

  return settings;
}

export function useSiteDoctors() {
  const [items, setItems] = useState(doctors);

  useEffect(() => {
    getSiteDoctors().then(({ data }) => {
      if (data.items?.length) {
        setItems(data.items.map((doctor) => ({
          name: doctor.name,
          role: doctor.role,
          exp: doctor.experience,
          schedule: doctor.schedule,
          image: doctor.image,
          bio: doctor.bio
        })));
      }
    }).catch(() => {});
  }, []);

  return items;
}
