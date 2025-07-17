import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Inter',
  src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2'
});

Font.register({
  family: 'Roboto',
  src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2'
});

Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVI.woff2'
});

Font.register({
  family: 'Poppins',
  src: 'https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2'
});

Font.register({
  family: 'Montserrat',
  src: 'https://fonts.gstatic.com/s/montserrat/v25/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2'
});

Font.register({
  family: 'Playfair Display',
  src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qC0s.woff2'
});

Font.register({
  family: 'Merriweather',
  src: 'https://fonts.gstatic.com/s/merriweather/v30/u-440qyriQwlOrhSvowK_l5-fCZM.woff2'
});

Font.register({
  family: 'Source Sans Pro',
  src: 'https://fonts.gstatic.com/s/sourcesanspro/v21/6xK3dSBYKcSV-LCoeQqfX1RYOo3qOK7l.woff2'
});

Font.register({
  family: 'Raleway',
  src: 'https://fonts.gstatic.com/s/raleway/v28/1Ptug8zYS_SKggPNyC0ITw.woff2'
});

Font.register({
  family: 'Lato',
  src: 'https://fonts.gstatic.com/s/lato/v23/S6uyw4BMUTPHjx4wWw.woff2'
});

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontFamily: 'Helvetica',
    fontSize: 12,
    backgroundColor: '#fff',
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottom: '1px solid #eee',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 4,
    border: '1px solid #ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  logo: {
    width: 120,
    height: 120,
    objectFit: 'contain',
    marginBottom: 8,
  },
  text: {
    marginBottom: 4,
  },
});

// Props interface
interface BrandIdentitySuitePDFProps {
  businessName: string;
  logoUrl?: string; // PNG or SVG as data URL
  colors: string[];
  font: string;
  brandVoice?: {
    name: string;
    description: string;
    hero: string;
    descriptive: string;
    persona: {
      name: string;
      age: number;
      occupation: string;
      background: string;
      personality: string;
      communicationStyle: string;
    };
  };
  imageryUrls?: string[];
  summary?: string;
}

const BrandIdentitySuitePDF: React.FC<BrandIdentitySuitePDFProps> = ({
  businessName,
  logoUrl,
  colors,
  font,
  brandVoice,
  imageryUrls = [],
  summary,
}) => {
  // Font family mapping
  const getFontFamily = (fontName: string) => {
    const fontMap: { [key: string]: string } = {
      'inter': 'Inter',
      'roboto': 'Roboto',
      'open-sans': 'Open Sans',
      'poppins': 'Poppins',
      'montserrat': 'Montserrat',
      'playfair-display': 'Playfair Display',
      'merriweather': 'Merriweather',
      'source-sans-pro': 'Source Sans Pro',
      'raleway': 'Raleway',
      'lato': 'Lato'
    };
    return fontMap[fontName] || 'Helvetica';
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Cover Section */}
        <View style={styles.section}>
          <Text style={styles.heading}>{businessName}</Text>
          {logoUrl && <Image src={logoUrl} style={styles.logo} />}
        </View>

        {/* Brand Overview */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.subheading}>Brand Overview</Text>
            <Text style={styles.text}>{summary}</Text>
          </View>
        )}

        {/* Color Palette */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Color Palette</Text>
          <View style={styles.row}>
            {colors.map((color) => (
              <View key={color} style={[styles.colorSwatch, { backgroundColor: color }]} />
            ))}
          </View>
          <View style={styles.row}>
            {colors.map((color) => (
              <Text key={color} style={styles.text}>{color}</Text>
            ))}
          </View>
        </View>

        {/* Typography */}
        <View style={styles.section}>
          <Text style={styles.subheading}>Typography</Text>
          <Text style={styles.text}>Selected Font: {font}</Text>
          <Text style={[styles.text, { fontSize: 24, fontFamily: getFontFamily(font) }]}>Heading Example</Text>
          <Text style={[styles.text, { fontSize: 16, fontFamily: getFontFamily(font) }]}>Body text example for your brand.</Text>
        </View>

        {/* Brand Voice */}
        {brandVoice && (
          <View style={styles.section}>
            <Text style={styles.subheading}>Brand Voice</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Name:</Text> {brandVoice.name}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Description:</Text> {brandVoice.description}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Hero:</Text> {brandVoice.hero}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Descriptive:</Text> {brandVoice.descriptive}</Text>
            <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>Persona:</Text></Text>
            <Text style={styles.text}>- Name: {brandVoice.persona.name}, Age: {brandVoice.persona.age}, Occupation: {brandVoice.persona.occupation}</Text>
            <Text style={styles.text}>- Background: {brandVoice.persona.background}</Text>
            <Text style={styles.text}>- Personality: {brandVoice.persona.personality}</Text>
            <Text style={styles.text}>- Communication Style: {brandVoice.persona.communicationStyle}</Text>
          </View>
        )}

        {/* Imagery */}
        {imageryUrls.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.subheading}>Imagery Direction</Text>
            <View style={styles.row}>
              {imageryUrls.map((url, idx) => (
                <Image key={idx} src={url} style={{ width: 80, height: 80, marginRight: 8, marginBottom: 8, borderRadius: 4 }} />
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default BrandIdentitySuitePDF; 